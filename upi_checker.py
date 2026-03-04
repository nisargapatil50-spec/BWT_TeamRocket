import re

def check_upi(upi_id: str):
    indicators = []
    if not upi_id:
        return indicators

    upi_l = upi_id.lower()
    impersonation_tokens = ["support@", "refund@", "help@", "official@"]
    for tok in impersonation_tokens:
        if tok in upi_l:
            indicators.append("Suspicious impersonation handle")
            break

    digits = sum(c.isdigit() for c in upi_l)
    if digits > 5:
        indicators.append("UPI ID contains excessive numbers")

    if re.search(r"(support|help|refund)[-_](desk|refund|support)@", upi_l):
        indicators.append("Suspicious impersonation handle")

    return indicators
