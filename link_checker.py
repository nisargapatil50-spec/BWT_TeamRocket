from urllib.parse import urlparse

def check_link(url: str):
    indicators = []
    if not url:
        return indicators
    try:
        host = urlparse(url).netloc.lower()
    except Exception:
        host = ""

    suspicious_tokens = ["pay", "payment", "verify", "verification", "secure", "login"]
    if any(t in host for t in suspicious_tokens):
        indicators.append("Suspicious payment verification link")

    leet_suspects = ["amaz0n", "paytm-", "paytm--", "bookmyshow-pay", "flipkart-payment", "verification"]
    if any(s in host for s in leet_suspects):
        indicators.append("Possible phishing domain detected")

    return indicators
