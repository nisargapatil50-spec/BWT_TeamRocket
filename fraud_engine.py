def calculate_risk_score(indicators):
    score = 0
    reasons = list(indicators or [])

    weights = [
        (20, "scam keyword"),
        (25, "impersonation handle"),
        (30, "phishing domain"),
        (30, "suspicious domain"),
        (30, "verification link"),
        (15, "numeric"),
        (15, "numbers"),
        (15, "numeric anomaly"),
        (15, "excessive numbers"),
        (15, "payment verification"),
    ]

    text_indicators = [s.lower() for s in reasons]
    for ind in text_indicators:
        for w, key in weights:
            if key in ind:
                score += w

    score = min(score, 100)

    if score <= 30:
        classification = "Safe"
        decision = "Allow"
    elif score <= 65:
        classification = "Suspicious"
        decision = "Flag"
    else:
        classification = "High Risk"
        decision = "Block"

    return {
        "fraud_score": score,
        "classification": classification,
        "decision": decision,
        "reasons": reasons,
    }
