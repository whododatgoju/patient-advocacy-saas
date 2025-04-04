# Incident Response Runbook

## Overview

This runbook provides step-by-step procedures for responding to common incidents in the Patient Advocacy Platform. Follow these guidelines to diagnose and resolve issues quickly and efficiently.

## Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| P0    | Critical - Service is down or unusable for all users | Immediate (24/7) | Database outage, API total failure |
| P1    | High - Major functionality impaired for many users | < 1 hour (business hours) | Authentication failure, payment processing errors |
| P2    | Medium - Non-critical function unavailable or degraded | < 4 hours (business hours) | Search functionality degraded, non-critical feature unavailable |
| P3    | Low - Minor issue with minimal user impact | < 24 hours (business hours) | UI glitches, non-blocking bugs |

## On-Call Responsibilities

1. Monitor alerting channels (PagerDuty, Slack)
2. Acknowledge alerts within 15 minutes
3. Begin investigation immediately for P0/P1 issues
4. Communicate status to stakeholders according to the communication plan
5. Document all actions taken in the incident log

## Common Incidents and Resolution Steps

### API Service Outage

**Symptoms**: API endpoints return 5xx errors, client applications can't load data

**Resolution Steps**:

1. Check API service health in Kubernetes dashboard:
   ```
   kubectl get pods -n patient-advocacy
   ```

2. Check logs for error patterns:
   ```
   kubectl logs -n patient-advocacy deployment/patient-advocacy-api --tail=100
   ```

3. Verify database connectivity:
   ```
   kubectl exec -it -n patient-advocacy deployment/patient-advocacy-api -- curl -v postgres-service:5432
   ```

4. Check for recent deployments that might have introduced issues:
   ```
   kubectl rollout history deployment/patient-advocacy-api -n patient-advocacy
   ```

5. If necessary, roll back to last known good deployment:
   ```
   kubectl rollout undo deployment/patient-advocacy-api -n patient-advocacy
   ```

### Database Performance Issues

**Symptoms**: Slow response times, timeouts on database-dependent operations

**Resolution Steps**:

1. Check database connection pool metrics in Grafana dashboard
2. Run query to identify long-running transactions:
   ```sql
   SELECT pid, now() - pg_stat_activity.query_start AS duration, query
   FROM pg_stat_activity
   WHERE pg_stat_activity.query != ''
   AND state != 'idle'
   ORDER BY now() - pg_stat_activity.query_start DESC;
   ```

3. Check database load metrics (CPU, memory, I/O)
4. Review index usage and query performance statistics
5. If needed, kill long-running queries causing issues:
   ```sql
   SELECT pg_terminate_backend(pid)
   FROM pg_stat_activity
   WHERE now() - pg_stat_activity.query_start > interval '5 minutes';
   ```

## Escalation Procedures

If you cannot resolve an incident within the expected timeframe:

1. Escalate to the next tier of support according to the following path:
   - Tier 1: On-call engineer
   - Tier 2: Engineering team lead
   - Tier 3: VP of Engineering / CTO

2. When escalating, provide:
   - Detailed description of the issue
   - Impact assessment
   - All troubleshooting steps already attempted
   - Relevant logs and metrics

## Post-Incident Process

After resolving any P0 or P1 incident:

1. Document the incident in the incident log
2. Schedule a post-mortem meeting within 48 hours
3. Identify root causes and contributing factors
4. Develop action items to prevent recurrence
5. Update this runbook with any new learnings
