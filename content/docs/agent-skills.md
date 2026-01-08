---
title: 'Agent Skills'
description: 'Configure and use agent skills to extend Self AI capabilities with custom workflows and automation'
date: '2024-01-01'
---

# GEO submitter
This example demonstrates the GEO Submission Pipeline skill for submitting sequencing data to NCBI GEO.

## GEO Submission Pipeline

Pipeline: AWS S3 → CHPC/HPC → MD5 validation → GEO FTP → SRA brokered submission

### Prerequisites

User has SSH multiplexing configured: `ssh -MNf chpc-login`

All commands run on CHPC via: `ssh chpc-login "<command>"`

### Workflow Overview

1. **Retrieve data** from AWS S3 to CHPC scratch
2. **Generate MD5 checksums** for all FASTQ files
3. **Prepare GEO metadata** spreadsheet
4. **Upload to GEO FTP** via lftp (SLURM recommended)
5. **Submit metadata** to complete submission

## Step 1: Retrieve Data from AWS S3

### 1a. Configure AWS CLI

Ask user to configure AWS CLI on CHPC (credentials from core browser):

```bash
ssh chpc-login "aws configure --profile <USER>"
```

Collect from user:
- AWS profile name (e.g., `KJones`)
- S3 link from core browser
- Output directory on CHPC (e.g., `/scratch/li_lab/geo_submission/fastq`)

### 1b. Copy and Edit Download Script

Copy script to CHPC and edit with user's values:

```bash
scp scripts/s3_download.slurm chpc-login:~/
ssh chpc-login "nano ~/s3_download.slurm"
```

Set in script:
- `S3_LINK` — the s3:// URL
- `AWS_PROFILE` — profile name configured above
- `OUTPUT_DIR` — destination path on CHPC

### 1c. Submit Job

```bash
ssh chpc-login "sbatch ~/s3_download.slurm"
ssh chpc-login "squeue -u \$USER"  # monitor job
```

## Step 2: Generate MD5 Checksums

```bash
ssh chpc-login "cd /path/to/fastq && md5sum *.fastq.gz | awk '{print \$2 \"\\t\" \$1}' > md5_checksums.txt"
```

Or copy and run the helper script:

```bash
scp scripts/generate_md5.sh chpc-login:~/
ssh chpc-login "~/generate_md5.sh /path/to/fastq"
```

Format: `filename<TAB>md5sum` — matches GEO metadata requirements.

## Step 3: Prepare GEO Metadata

Follow instructions at: https://submit.ncbi.nlm.nih.gov/geo/submission/meta/

Critical: File names in metadata must **exactly match** uploaded FASTQ filenames.

## Step 4: Configure FTP Authentication

Copy and run setup script on CHPC:

```bash
scp scripts/setup_netrc.sh chpc-login:~/
ssh chpc-login "~/setup_netrc.sh"
```

Then ask user to edit `~/.netrc` on CHPC to add their password:

```bash
ssh chpc-login "nano ~/.netrc"
```

Expected format:
```
machine ftp-private.ncbi.nlm.nih.gov
login geoftp
password YOUR_ACTUAL_PASSWORD
```

⚠️ **Required**: Permissions must be 600 — lftp ignores files with open permissions.

## Step 5: Upload to GEO FTP

### Option A: Interactive lftp

```bash
ssh chpc-login "lftp geoftp@ftp-private.ncbi.nlm.nih.gov"
```

Inside lftp:
```
cd uploads/<YOUR_UPLOAD_DIR>
mirror -R /path/to/fastq  # upload folder
put processed_file.txt    # upload single file
```

### Option B: SLURM Job (Recommended for Large Datasets)

Copy scripts and edit with user's paths:

```bash
scp scripts/geo_upload.lftp scripts/geo_upload.slurm chpc-login:~/
ssh chpc-login "nano ~/geo_upload.lftp"  # edit upload dir and source path
```

Submit job:

```bash
ssh chpc-login "sbatch ~/geo_upload.slurm"
ssh chpc-login "squeue -u \$USER"  # monitor job
```

## Step 6: Submit Metadata

After upload completes, submit GEO HTS metadata spreadsheet via web interface.

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `scripts/s3_download.slurm` | Download from S3 (edit S3_LINK, AWS_PROFILE, OUTPUT_DIR first) |
| `scripts/geo_upload.lftp` | lftp commands (edit upload directory and source path first) |
| `scripts/geo_upload.slurm` | SLURM wrapper for lftp upload |
| `scripts/setup_netrc.sh` | Create ~/.netrc template (edit password after) |
| `scripts/generate_md5.sh` | Generate MD5 checksums in GEO format |

## Troubleshooting

- **lftp ignores credentials**: Check `chmod 600 ~/.netrc`
- **Upload interrupted**: Use `--continue` flag (already in scripts)
- **Slow transfer**: Adjust `--parallel=N` in lftp script (default: 2)

---

# GEO Submission Checklist

## Before Starting

- [ ] Obtain AWS credentials from core browser
- [ ] Start new GEO HTS submission to get FTP credentials
- [ ] Note your upload directory: `uploads/<email>_<token>/`

## Data Preparation

- [ ] Download data from S3 to CHPC scratch
- [ ] Verify all FASTQ files downloaded correctly
- [ ] Generate MD5 checksums: `md5sum *.fastq.gz | awk '{print $2 "\t" $1}' > md5_checksums.txt`
- [ ] Organize files in upload folder structure

## Metadata Preparation

- [ ] Download GEO metadata template
- [ ] Fill sample information (titles, source, characteristics)
- [ ] Fill raw file information (filenames, MD5 checksums)
- [ ] Verify filenames in metadata exactly match actual files
- [ ] Complete processed data files section if applicable

## FTP Setup

- [ ] Create `~/.netrc` with GEO FTP credentials
- [ ] Set permissions: `chmod 600 ~/.netrc`
- [ ] Test connection: `lftp geoftp@ftp-private.ncbi.nlm.nih.gov`

## Upload

- [ ] Edit `geo_upload.lftp` with correct paths
- [ ] Submit SLURM job: `sbatch geo_upload.slurm`
- [ ] Monitor job: `squeue -u $USER`
- [ ] Verify upload completion in job output

## Finalize

- [ ] Upload metadata spreadsheet via GEO web interface
- [ ] Confirm all files listed and MD5 checksums match
- [ ] Submit for processing
- [ ] Note GEO accession number when assigned

## Common Issues

| Issue | Solution |
|-------|----------|
| lftp ignores ~/.netrc | Check permissions are exactly 600 |
| Upload interrupted | Resubmit - `--continue` resumes transfer |
| MD5 mismatch | Regenerate checksums, verify file integrity |
| Filename mismatch | Update metadata to match exact filenames |
