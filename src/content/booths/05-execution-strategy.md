# Execution Strategy

> First conversation to signed POC in 90 days. The playbook below is repeatable, not aspirational.

## The end-to-end timeline

```
T-45 ─ Account qualified by AE → handoff to Strategic Initiatives
T-30 ─ Discovery call with customer champion + exec sponsor
T-21 ─ Format proposed → contract signed
T-14 ─ Problem-statement co-design workshop (Lovable SE + customer team)
T-7  ─ Final run-of-show; venue + catering + judging panel locked
T-3  ─ Builder pre-reads sent (Lovable 101, problem-statement brief)
T-0  ─ HACKATHON DAY
T+1  ─ 24h MOU lock-in (Optionsvereinbarung)
T+7  ─ POC kickoff (CS + SE embedded)
T+30 ─ POC review; SoW conversation begins
T+60 ─ SoW signed
T+90 ─ Production deployment
```

## T-30 → T-0 — pre-event

### Discovery (T-30)
- 60-minute call with customer champion + exec sponsor
- Three questions: *What does success look like? Who needs to be in the room? What problem is most painful right now?*
- Output: written problem-statement brief, attendee shortlist, format recommendation

### Problem-statement co-design (T-14)
- 90-minute working session — Lovable SE + customer's 2–3 SMEs
- Outputs: 3–6 problem statements (one per build team), each with: pain description, success criteria, sample data, any compliance constraints
- This is *the* most under-invested step. Customer hackathons that fail almost always failed here.

### Builder pre-reads (T-3)
- 20-minute Lovable Quickstart video
- Problem-statement brief
- Pre-built data shapes (mock CSVs, JSON, sample API responses) so day-of starts shipping, not configuring

## T-0 — game day run-of-show

| Time | Block | Owner |
|---|---|---|
| 09:00 | Welcome + framing (10 min) | Customer exec sponsor |
| 09:15 | Lovable demo + AI-literacy primer (20 min) | Lovable SE |
| 09:45 | Problem statements + team allocation (15 min) | Strategic Initiatives |
| 10:00 | **Sprint 1 — build** (3h) | Builders |
| 13:00 | Lunch + builder lightning-show-and-tells (60 min) | All |
| 14:00 | **Sprint 2 — refine + demo prep** (2h 30) | Builders |
| 16:30 | Live demos (40 min, 5 min × 8 teams) | Builders |
| 17:10 | Judging deliberation (20 min) | Panel |
| 17:30 | Award ceremony + exec close (30 min) | Customer exec + Lovable founder |
| 18:00 | Cocktails + 1-on-1 follow-through booking | Strategic Initiatives + AE |

## T+0 → T+30 — the MOU sprint

The single most important commercial mechanic: **same-day Optionsvereinbarung (option agreement)**.

A short, plain-English MOU signed by exec sponsor + Lovable rep that locks in a 30-day paid POC for the top 1–2 winning ideas. No procurement cycle, no MSA renegotiation. The legal pre-clears it weeks in advance with both sides.

This is the difference between "we had a great hackathon" and "we had a great hackathon and it became revenue."

## T+0 → T+90 — POC to production

The hackathon prototype is **not** production-ready. To make it enterprise-ready, the deployment team adds:

- **Connectors** (real data — Salesforce, Workday, ServiceNow, internal APIs)
- **Auth / RBAC** (SSO, roles, segregation of duty)
- **Audit / compliance** (append-only logs, regulator-ready exports, retention policy)
- **Security** (data residency, model-training opt-out, penetration-test pass)
- **Performance hardening** (caching, error states, fallbacks)

This sequence — *prototype → governed POC → production* — is the muscle the Applications group templates accelerate (see Scale booth).

## Risks + how I mitigate

| Risk | Mitigation |
|---|---|
| Exec sponsor cancels day-of | Pre-confirmed at T-7, day-of cameo locked in writing |
| Builders too junior, output weak | Pre-screen attendee list at T-21 with customer champion |
| MOU not pre-cleared by legal | Standard template signed off in customer's MSA at T-30 |
| POC stalls at security review | Procurement-acceleration pack (CAIQ, SIG, DPA) shipped on day 1 |
| Customer churns before SoW | CS embedded from T+0; first weekly review confirms exec endorsement |

## Open question for Ryan & Monica

> Who owns the customer relationship from T+30 onward — Strategic Initiatives, CS, or AE? My instinct: CS leads, with AE on commercial and Strategic Initiatives on flywheel learnings.
