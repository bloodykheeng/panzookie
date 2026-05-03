# Panzookie Network Website — Environment Setup Guide

Copy `.env.local.example` (or create `.env.local`) and fill in every value below.

---

## Complete `.env.local` Template

```env
# ===================== calendly =======================
NEXT_PUBLIC_CALENDLY_ENTERPRISE_URL=https://calendly.com/therealnetworkengineer/30min

# ===================== emailjs =======================
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_XXXXXXXX
NEXT_PUBLIC_EMAILJS_HOME_TEMPLATE_ID=template_XXXXXXXX
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_XXXXXXXX

# ===================== stripe =======================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXX

# --- one-time services ---
NEXT_PUBLIC_STRIPE_PRICE_NETWORK_HEALTH=price_XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PRICE_WIFI_OPTIMIZATION=price_XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PRICE_FULL_SETUP=price_XXXXXXXXXXXXXXXXXXXX

# --- subscriptions ---
NEXT_PUBLIC_STRIPE_PRICE_BASIC=price_XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PRICE_PREMIUM=price_XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PRICE_ELITE=price_XXXXXXXXXXXXXXXXXXXX

# ===================== general =======================
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 1. Calendly Setup

Calendly is used only for the **Enterprise Consultation** inline booking widget.

### Create Your Account
1. Go to [calendly.com](https://calendly.com) → sign up with your business email
2. Set your account username to **panzookienetworks** (Settings → Profile)

### Create 1 Event Type
Go to **Event Types → New Event Type**:

| Slug | Name | Duration | Purpose |
|------|------|----------|---------|
| `enterprise-consultation` | Enterprise Consultation | 60 min | Inline booking for business/enterprise clients |

The env var is already pre-filled — just ensure your Calendly username is `panzookienetworks` and the slug matches.

---

## 2. EmailJS Setup

### Create Account & Service
1. Go to [emailjs.com](https://www.emailjs.com) → create a free account
2. Go to **Email Services → Add New Service**
3. Choose **Gmail** → connect `therealnetworkengineer@gmail.com`
4. Copy the **Service ID** (e.g. `service_abc123`) → set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
5. Go to **Account → General** → copy your **Public Key** → set `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

### Template 1 — Home Network Form (`NEXT_PUBLIC_EMAILJS_HOME_TEMPLATE_ID`)

Go to **Email Templates → Create New Template**.

**To Email:** `therealnetworkengineer@gmail.com`  
**Subject:**
```
New Home Network Request from {{from_name}}
```

**Body — switch to the HTML editor and paste:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Home Network Request</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:system-ui,-apple-system,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#080d1a;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
              <div style="display:inline-block;background-color:#ffb400;border-radius:8px;padding:6px 14px;margin-bottom:14px;">
                <span style="color:#000;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">New Service Request</span>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                🏠 Home Network Request
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.5);font-size:13px;">
                Submitted via panzookienetworks.com
              </p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:32px;">

              <!-- Intro -->
              <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.6;">
                A new home network service request has been submitted by
                <strong style="color:#0f172a;">{{from_name}}</strong>.
                Please follow up at your earliest convenience.
              </p>

              <!-- Contact info card -->
              <table role="presentation" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;">Contact</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">{{from_name}}</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#ffb400;">
                      <a href="mailto:{{from_email}}" style="color:#b36e00;text-decoration:none;">{{from_email}}</a>
                    </p>
                    <p style="margin:4px 0 0;font-size:13px;color:#64748b;">📞 {{phone}}</p>
                  </td>
                </tr>
              </table>

              <!-- Details grid -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <!-- Home Size -->
                  <td width="50%" style="padding-right:8px;vertical-align:top;">
                    <table role="presentation" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;">Home Size</p>
                          <p style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">{{home_size}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Floors -->
                  <td width="50%" style="padding-left:8px;vertical-align:top;">
                    <table role="presentation" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;">Floors</p>
                          <p style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">{{floors}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Issues -->
              <table role="presentation" width="100%" style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:10px;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#92400e;">Reported Issues</p>
                    <p style="margin:0;font-size:14px;font-weight:600;color:#78350f;">{{issues}}</p>
                    <p style="margin:10px 0 0;font-size:13px;color:#92400e;line-height:1.6;">{{issue_description}}</p>
                  </td>
                </tr>
              </table>

              <!-- 3-col flags -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <!-- Ethernet -->
                  <td width="33%" style="padding-right:6px;vertical-align:top;">
                    <table role="presentation" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;text-align:center;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;">Ethernet OK?</p>
                          <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a;text-transform:capitalize;">{{ethernet_cables}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Maintenance -->
                  <td width="33%" style="padding:0 3px;vertical-align:top;">
                    <table role="presentation" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;text-align:center;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;">Maintenance</p>
                          <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a;text-transform:capitalize;">{{maintenance}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Pre-visit -->
                  <td width="33%" style="padding-left:6px;vertical-align:top;">
                    <table role="presentation" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;text-align:center;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;">Pre-Visit</p>
                          <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a;">{{visit_before}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Visit notes (only shows if filled) -->
              <table role="presentation" width="100%" style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;margin-bottom:8px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#166534;">Pre-Visit Notes</p>
                    <p style="margin:0;font-size:13px;color:#15803d;line-height:1.6;">{{visit_description}}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── CTA ── -->
          <tr>
            <td style="background-color:#080d1a;padding:24px 32px;text-align:center;">
              <a
                href="mailto:{{from_email}}"
                style="display:inline-block;background-color:#ffb400;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:12px 28px;border-radius:8px;"
              >
                Reply to {{from_name}} →
              </a>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f0f4f8;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                This message was sent from the contact form at
                <a href="https://panzookienetworks.com" style="color:#b36e00;text-decoration:none;">panzookienetworks.com</a>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#cbd5e1;">© Panzookie Networks — All rights reserved</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

Copy the **Template ID** (e.g. `template_abc123`) → set `NEXT_PUBLIC_EMAILJS_HOME_TEMPLATE_ID`

---

### Template 2 — Contact Form (`NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID`)

Go to **Email Templates → Create New Template**.

**To Email:** `therealnetworkengineer@gmail.com`  
**Subject:**
```
{{subject}} — from {{from_name}}
```

**Body — switch to the HTML editor and paste:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:system-ui,-apple-system,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#080d1a;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
              <div style="display:inline-block;background-color:#ffb400;border-radius:8px;padding:6px 14px;margin-bottom:14px;">
                <span style="color:#000;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">New Message</span>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                💬 Contact Us Message
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.5);font-size:13px;">
                Submitted via panzookienetworks.com
              </p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:32px;">

              <!-- Intro -->
              <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.6;">
                You have a new message from
                <strong style="color:#0f172a;">{{from_name}}</strong>.
                Please follow up at your earliest convenience.
              </p>

              <!-- Contact info card -->
              <table role="presentation" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;">From</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">{{from_name}}</p>
                    <p style="margin:4px 0 0;font-size:14px;">
                      <a href="mailto:{{from_email}}" style="color:#b36e00;text-decoration:none;">{{from_email}}</a>
                    </p>
                    <p style="margin:4px 0 0;font-size:13px;color:#64748b;">📞 {{phone}}</p>
                  </td>
                </tr>
              </table>

              <!-- Subject badge -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#92400e;">Subject</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#78350f;">{{subject}}</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" style="margin-bottom:8px;">
                <tr>
                  <td style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;">
                    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;">Message</p>
                    <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap;">{{message}}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── CTA ── -->
          <tr>
            <td style="background-color:#080d1a;padding:24px 32px;text-align:center;">
              <a
                href="mailto:{{from_email}}"
                style="display:inline-block;background-color:#ffb400;color:#000000;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:12px 28px;border-radius:8px;"
              >
                Reply to {{from_name}} →
              </a>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f0f4f8;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                This message was sent from the contact form at
                <a href="https://panzookienetworks.com" style="color:#b36e00;text-decoration:none;">panzookienetworks.com</a>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#cbd5e1;">© Panzookie Networks — All rights reserved</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

Copy the **Template ID** → set `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID`

---

## 3. Stripe Setup

### Get API Keys
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → sign up / log in
2. Switch to **Live mode** (top-left toggle) when ready for production; use **Test mode** during development
3. Go to **Developers → API Keys**
4. Copy **Publishable key** → set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Copy **Secret key** → set `STRIPE_SECRET_KEY`

---

### One-Time Service Products

Go to **Products → Add Product** and create these 3:

| Product Name | Price | Type | Env Var |
|---|---|---|---|
| Network Health Check | $99 | One-time | `NEXT_PUBLIC_STRIPE_PRICE_NETWORK_HEALTH` |
| Wi-Fi Optimization | $350 | One-time | `NEXT_PUBLIC_STRIPE_PRICE_WIFI_OPTIMIZATION` |
| Full Home Network Setup | $1,200 | One-time | `NEXT_PUBLIC_STRIPE_PRICE_FULL_SETUP` |

For each product: after saving, click the price row → copy the **Price ID** (starts with `price_`) → paste into the matching env var.

---

### Subscription Products

Go to **Products → Add Product** and create these 3. **Important:** set Billing as **Recurring**, not one-time.

| Product Name | Price | Billing | Env Var |
|---|---|---|---|
| Basic Plan | $25/month | Recurring | `NEXT_PUBLIC_STRIPE_PRICE_BASIC` |
| Premium Plan | $75/month | Recurring | `NEXT_PUBLIC_STRIPE_PRICE_PREMIUM` |
| Elite Plan | $150/month | Recurring | `NEXT_PUBLIC_STRIPE_PRICE_ELITE` |

Copy each **Price ID** → paste into the matching env var.

---

## 4. Base URL

Set `NEXT_PUBLIC_BASE_URL` to your deployed domain, e.g.:
- Local dev: `http://localhost:3000`
- Production: `https://panzookie.com`

---

## Summary Checklist

- [ ] Calendly account username = `panzookienetworks`
- [ ] `enterprise-consultation` event type created in Calendly
- [ ] EmailJS service connected to `therealnetworkengineer@gmail.com`
- [ ] EmailJS Home Network template created (HTML body pasted) → ID set
- [ ] EmailJS Contact template created (HTML body pasted) → ID set
- [ ] EmailJS public key set
- [ ] Stripe publishable + secret keys set
- [ ] 3 one-time service price IDs set
- [ ] 3 subscription price IDs set
- [ ] `NEXT_PUBLIC_BASE_URL` set to production domain
