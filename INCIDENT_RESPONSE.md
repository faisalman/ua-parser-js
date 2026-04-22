# UAParser.js: Incident Response Plan

## Purpose

This document outlines how UAParser.js maintainers detect, respond to, and manage security incidents.

## Scope

This plan applies to the following assets:

- Source code repository and build pipelines on GitHub.
- Release packages on npm.
- Main website on https://uaparser.dev.

It does not cover unrelated third-party forks, unofficial packages, or external integrations.

Versions `<= 0.7.x` and `0.8.x` are deprecated and no longer supported.

## Detection & Triage

Potential security issues are identified through:

- Private vulnerability disclosures via the security policy or GitHub Security Advisories.
- Public reports in GitHub Issues or Discussions.
- Automated detection tools (e.g., Dependabot, OSS-Fuzz, CodeQL, and secret scanning).

## Assessment

Each issue is evaluated based on severity:

- Critical: Compromise of npm or repository, malicious code in a published package, signing/token compromise, or supply chain attack.
- High: Exploitable vulnerabilities such as ReDoS via crafted User-Agent or other HTTP Headers input, unsafe code execution paths, or exposure of secrets with publish access.
- Low: Issues with limited impact, documentation errors, or security weakness with constrained exploitability.

## Response

- Acknowledge the report and move sensitive discussions to a private channel.
- Validate and reproduce the issue.
- Determine affected versions and distribution channels.
- Contain the incident by rotating exposed credentials and deprecating affected versions if necessary.
- Resolve the root cause, add regression tests, and release patched versions.

## Communication

- Assign a CVE for Critical and High severity issues.
- Publish a GitHub Security Advisory, release notes, and a pinned issue when appropriate.
- Update this document with a summary of the incident and its resolution.
- Provide clear upgrade instructions, verification steps, and mitigation guidance for users.

## Recovery & Hardening

- Perform a post-incident review (including timeline, root cause, detection gaps, and prevention measures).
- Implement additional tests, fuzzing cases, lint rules, or release checks to prevent recurrence.
- Review and strengthen npm, GitHub, and CI/CD security settings (e.g., token scope, 2FA, and publish permissions).

---

## Recent Incidents & Fixes

### 2022 - ReDoS Vulnerability (High)

- CVE ID: CVE-2022-25927
- CVSS Score: 7.5/10
- GHSA: [GHSA-fhg7-m89q-25r3](https://github.com/faisalman/ua-parser-js/security/advisories/GHSA-fhg7-m89q-25r3)
- Affected versions: `<0.7.33` / `>=0.8.0,<1.0.33`
- Description: A regular expression was vulnerable to catastrophic backtracking when processing specially crafted User-Agent strings. The vulnerable regex was rewritten, and `safe-regex` linting was introduced. Fix released in `0.7.33` / `1.0.33`.

### 2021 - npm Supply-Chain Attack (Critical)

- CVE ID: CVE-2021-4229
- CVSS Score: 8.8/10
- GHSA: [GHSA-pjwm-rvh2-c87w](https://github.com/advisories/GHSA-pjwm-rvh2-c87w)
- Affected versions: `0.7.29` / `0.8.0` / `1.0.0`
- Description: The maintainer's npm account was hijacked, resulting in the publication of malicious versions (`0.7.29`, `0.8.0`, and `1.0.0`) containing crypto-mining and credential-stealing scripts. These versions were removed, credentials were rotated, and clean versions (`0.7.30`, `0.8.1`, and `1.0.1`) were published.