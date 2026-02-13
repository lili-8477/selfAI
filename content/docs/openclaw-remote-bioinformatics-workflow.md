# 用 OpenClaw 实现远程生信分析：一个 AI Agent 协作的实践案例

*2026-02-13*

---

## 引言

昨晚，我在没有电脑的情况下，通过手机完成了一个完整的 RNA-seq 差异表达分析。不是简单地发个指令等结果，而是实时交互、调整参数、追加分析——这一切都通过 iMessage 与我的 AI Agent「Kit」完成。

这篇文章记录这个工作流程，分享 OpenClaw 在远程协作场景下的几个独特优势。

---

## 场景：手机上完成 DESeq2 分析

我的需求很简单：对一组 RNA-seq 数据做差异表达分析，比较不同 siRNA knockdown 条件。数据已经在服务器上，我只需要：

1. 告诉 Agent 数据位置
2. 指定分析类型和对比组
3. 查看结果，追加分析

实际对话大概是这样的：

```
我: /Users/.../counts.txt 和 samples.xlsx, run deseq for me

Kit: Spawned the rnaseq-expert on it. It'll run DESeq2 via hciR, 
     generate PCA, volcano plots, heatmaps...

[7分钟后]

Kit: 分析完成！9个对比组，结果在 results/ 文件夹

我: 帮我跑一下 si* 系列对比 siControl 的 comparison

Kit: 好的，正在跑 siNONO vs siControl, siSFPQ vs siControl...

[2分钟后]

Kit: 搞定了！siSFPQ knockdown 的差异基因数量是 siNONO 的约两倍...
```

整个过程，我在地铁上完成。

---

## 架构：主 Agent + 专职子 Agent

OpenClaw 的核心设计是 **Agent 协作**。在这个案例中：

```
┌─────────────────────────────────────────────────────┐
│  Main Agent (Kit)                                   │
│  - 日常交互、任务分发                                │
│  - 理解用户意图，选择合适的子 Agent                  │
│  - 汇总结果，自然语言反馈                            │
└─────────────────────┬───────────────────────────────┘
                      │ sessions_spawn()
                      ▼
┌─────────────────────────────────────────────────────┐
│  RNAseq Expert Agent                                │
│  - 专注生信分析                                      │
│  - 独立 workspace                                   │
│  - 专属 skills: rnaseq-deseq, ngs-analysis          │
└─────────────────────────────────────────────────────┘
```

主 Agent 收到「跑 DESeq」的请求后，通过 `sessions_spawn()` 将任务分配给专职的 `rnaseq-expert`。子 Agent 在独立的 session 中执行分析，完成后将结果返回。

---

## 优势一：无电脑远程工作

这是最直观的好处。OpenClaw 支持多种消息通道（iMessage、Telegram、Discord 等），Agent 运行在你的服务器或 Mac 上，你只需要一个能发消息的设备。

**关键点：**
- 不是「发指令等邮件」的异步模式，而是实时对话
- 可以追问、调整、迭代——真正的交互式分析
- 结果文件在服务器上，随时可以进一步处理

对于计算生物学家来说，这意味着：
- 在通勤时 review 昨晚的分析结果
- 发现问题立即调整，不用等回到办公室
- 周末有灵感时快速验证一个想法

---

## 优势二：专职 Agent，独立 Workspace

为什么不让一个 Agent 做所有事？因为**专业化带来效率**。

### 独立 Workspace 的好处

每个子 Agent 可以有自己的工作目录：

```yaml
agents:
  list:
    - id: main
      workspace: ~/.openclaw/workspace
    - id: rnaseq-expert
      workspace: ~/bioinfo/rnaseq
      skills: [rnaseq-deseq, ngs-analysis]
```

这意味着：
- 生信 Agent 只看到生信相关的文件和工具
- 不会被其他项目的上下文干扰
- Memory 和 Skills 可以针对性配置

### 模型选择与成本优化

不同任务可以用不同模型：

```yaml
agents:
  list:
    - id: main
      model: anthropic/claude-opus-4-5  # 主 Agent 用最强模型
    - id: rnaseq-expert
      model: anthropic/claude-sonnet-4  # 专职 Agent 用性价比更高的模型
```

生信分析的大部分工作是执行 R 脚本和解析输出，不需要最顶级的推理能力。用 Sonnet 跑子任务，Opus 负责理解意图和整合结果，可以显著降低 token 成本。

### Skill 系统

每个 Agent 只加载它需要的 Skills：

```
skills/
├── rnaseq-deseq/
│   ├── SKILL.md          # Agent 指令
│   ├── assets/
│   │   └── rnaseq_template.Rmd
│   └── references/
│       ├── contrasts.md  # 复杂对比设计指南
│       └── pathways.md   # GSEA 参考
└── ngs-analysis/
    └── SKILL.md
```

`rnaseq-expert` 加载这些 Skills 后，就「知道」如何使用 hciR/hciRdata 做分析，不需要每次都在 prompt 里解释 DESeq2 的用法。

---

## 优势三：自建 Agent，Human in the Loop

OpenClaw 的设计哲学是**工具而非替代**。我可以完全控制：

### 1. Agent 的能力边界

```yaml
agents:
  list:
    - id: rnaseq-expert
      skills: [rnaseq-deseq]  # 只给它需要的能力
      tools:
        deny: [message, cron]  # 禁止它主动发消息或设置定时任务
```

子 Agent 只能做分析，不能自作主张地通知别人或安排后续工作。

### 2. 审批流程

对于敏感操作，可以要求人工确认：

```yaml
approvals:
  exec:
    enabled: true
    targets:
      - channel: imessage
        to: "+1234567890"
```

Agent 想执行某些命令时，会先问我。

### 3. 限制自主性

我现在的策略是 **Human in the Loop**：
- Agent 负责执行具体任务
- 我负责决策和方向
- 不给 Agent 太多自主权（比如自动判断下一步分析）

这不是因为不信任 AI，而是因为科研分析需要领域知识和判断。AI 是加速器，不是自动驾驶。

---

## 实践建议

如果你想搭建类似的工作流：

### 1. 从小开始

先用单一 Agent + 一个 Skill 跑通流程，再考虑拆分子 Agent。

### 2. Skill 是关键

好的 Skill 文档能让 Agent 事半功倍：
- 明确的 workflow 步骤
- 常见问题的处理方式
- 参考命令和模板

### 3. 日志和复现

保存 Agent 的 session transcript，方便：
- Debug 分析过程
- 复现或修改分析
- 积累 best practices

### 4. 渐进式放权

开始时多限制，观察 Agent 的行为模式，逐步放开信任的操作。

---

## 结语

这个工作流的本质是**把 AI 当作一个靠谱的实习生**：
- 你告诉它做什么
- 它去执行并汇报
- 你决定下一步

OpenClaw 提供了实现这种协作的基础设施。对于计算生物学这种需要大量重复性分析、但又需要人工判断的领域，这种 Human-AI 协作模式特别合适。

下次你在地铁上突然想到一个分析思路，不用等回到电脑前——直接发条消息就好。

---

*工具：OpenClaw + Claude Opus 4.5 + hciR/DESeq2*

*作者注：本文由 Kit（我的 AI Agent）协助撰写，但所有观点和实践经验来自真实使用。*
