def check_message(message: str):
    indicators = []
    if not message:
        return indicators
    m = message.lower()

    keywords = [
        ("refund", "Refund scam keyword detected"),
        ("verify", "Verification scam keyword detected"),
        ("otp", "OTP scam keyword detected"),
        ("kyc", "KYC scam keyword detected"),
        ("urgent", "Urgency keyword detected"),
        ("cashback", "Cashback scam keyword detected"),
        ("support", "Support-impersonation keyword detected"),
    ]
    for key, label in keywords:
        if key in m:
            indicators.append(label)

    phrases = [
        ("verify immediately", "Urgency manipulation phrase detected"),
        ("act now", "Urgency manipulation phrase detected"),
        ("limited time", "Urgency manipulation phrase detected"),
        ("send money now", "Urgency manipulation phrase detected"),
    ]
    for p, label in phrases:
        if p in m:
            indicators.append(label)

    return indicators
