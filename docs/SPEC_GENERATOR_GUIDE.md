# Network Configuration Application - Agentic AI Specification Generator Guide

This document serves as a comprehensive reference for the Agentic AI Specification Generator that produces design specifications for the unified network configuration app.

## Overview

The specification generator is an AI-powered system that creates detailed feature specifications following a consistent, architecture-driven approach. It synthesizes best practices from industry-leading platforms while maintaining vendor neutrality and user-centric design.

## Supported Vendors

The system generates specifications and analyzes APIs for:

- **TP-Link** — Consumer/prosumer routers and access points
- **ASUS** — Consumer routers with mesh (AiMesh) capabilities
- **Netgear** — Consumer and prosumer networking hardware
- **Ubiquiti** — Prosumer mesh networks and UniFi ecosystem
- **OPNsense** — Open-source enterprise firewall/router
- **pfSense** — Open-source enterprise firewall/router
- **Cisco** — Enterprise-grade networking equipment

## Design Principles

Every specification adheres to these core principles:

### 1. Progressive Disclosure

**Goal**: Make the app accessible to beginners without hiding power-user depth.

**Implementation**:
- Default views show only essential settings (3-5 options maximum)
- Advanced features hidden behind clearly labeled toggles labeled "Advanced" or "More Options"
- No information is permanently hidden; all settings are discoverable
- Smooth transitions between modes (no page reloads, no data loss)
- Visual indicators showing when advanced features are in use

**Design Pattern**:
```
Beginner View (Simple):
┌─────────────────────┐
│ Network Name        │
│ [_________________] │
│ Password            │
│ [_________________] │
│ Security: WPA3      │
│ [More Options ▼]    │
└─────────────────────┘

Advanced View (Expanded):
┌─────────────────────┐
│ Network Name        │
│ [_________________] │
│ Password            │
│ [_________________] │
│ Security Mode       │
│ ○ WPA3 ○ WPA2 ○ WPA│
│ Channel             │
│ [1 ▼] Auto         │
│ Band Steering       │
│ ☑ Enabled          │
│ Transmit Power      │
│ [████████░░] 80%   │
│ [Less Options ▲]    │
└─────────────────────┘
```

**Example**: VLAN wizard shows name and description by default; toggle "Advanced" reveals VLAN ID (1–4094), 802.1Q tagging settings, priority levels, and isolation rules.

### 2. Plain Language First

**Goal**: Explain technical concepts in everyday terms without sacrificing accuracy.

**Implementation**:
- Every technical term has an inline, one-line explanation in parentheses
- Original technical term always visible (not replaced)
- Explanations are contextual, not generic glossary entries
- Use analogies and examples for complex concepts
- Define acronyms on first use

**Writing Guidelines**:
- Avoid jargon; if you must use it, explain it immediately
- Use active voice ("You can create segments" not "Segments can be created")
- Be specific ("Block all internet access" not "Disable connectivity")
- Use "you/your" to create connection

**Example**:

❌ Bad:
```
Configure 802.1Q VLAN tagging to segment traffic
```

✅ Good:
```
VLAN (Virtual Network Segment) — a way to split your network into separate groups.
802.1Q tagging lets you label network packets so they reach the right segment.
```

### 3. Consistency Across Platforms

**Goal**: Identical feature set and functionality across iOS, Android, Web, Windows, macOS, and Linux.

**Implementation**:
- No features exclusive to one platform (even if harder to implement on another)
- Adaptive UI that respects platform conventions:
  - iOS: Back button, bottom navigation, haptic feedback
  - Android: 3-line menu, bottom sheet, material design
  - Web: Sidebar, keyboard shortcuts, responsive grid
  - Desktop: Context menus, window management, keyboard focus
- Desktop features are accessible on mobile (not hidden in "advanced" sections)
- Responsive layouts; single codebase where possible

**Test Checklist**:
- [ ] Feature works on all 6 platforms
- [ ] No platform-only features
- [ ] Mobile version isn't a "lite" version
- [ ] Feature discovery is equal across platforms

**Example**: If desktop has a raw VLAN ID editor, mobile has it too (possibly behind a tab or dedicated button, but with full functionality).

### 4. Safety by Default

**Goal**: Prevent accidental disconnection, network outage, or data loss.

**Implementation for High-Risk Changes**:

Every change that could disconnect the user or others requires:
1. **Clear preview** — Show exactly what will happen
2. **Explicit confirmation** — Multi-step confirmation (not a single button)
3. **Easy rollback/undo** — Revert within 2 minutes if mistake detected
4. **Warning if action disconnects user** — "This will disconnect you. Ready?" message

**Security Defaults**:
- New VLANs isolated by default (no inter-VLAN communication)
- Remote access disabled by default
- Firewall rules use "deny by default" (whitelist model)
- Guest VLANs cannot access internal devices by default

**UI Pattern for Risky Actions**:
```
Step 1: Preview
┌──────────────────────────────────┐
│ Create Firewall Rule             │
├──────────────────────────────────┤
│ Action: Block device from internet
│ Affected devices: 1 (Living Room TV)
│ When this rule is active:
│  • Living Room TV cannot access
│    the internet or any websites
│  • Living Room TV can still connect
│    to your network
│
│ ⚠ This will disconnect the TV
│ ┌──────────────┬────────────────┐
│ │ Cancel       │ Apply Rule     │
│ └──────────────┴────────────────┘
└──────────────────────────────────┘

Step 2: Confirmation (if high-risk)
┌──────────────────────────────────┐
│ Are you sure?                     │
│ This will affect Living Room TV   │
│ ┌──────────────┬────────────────┐
│ │ Go back      │ Yes, apply it  │
│ └──────────────┴────────────────┘
└──────────────────────────────────┘

Step 3: Undo Opportunity
┌──────────────────────────────────┐
│ ✓ Rule applied!                  │
│ Undo in: 2:00 remaining          │
│ [Undo] [Keep]                    │
└──────────────────────────────────┘
```

### 5. Vendor Abstraction, Not Erasure

**Goal**: Provide unified interface while being transparent about vendor differences.

**Implementation**:
- Show device name, vendor, and model clearly on every setting
- Indicate which features are available/unavailable per vendor:
  ```
  Firewall Rules
  ✓ Supported on: OPNsense, pfSense, ASUS
  ○ Using ACLs on: TP-Link, Netgear
  ✗ Not available on: Ubiquiti
  ```
- Allow bulk actions across compatible devices
- Document API limitations and provide fallback approaches
- Show "Coming Soon" for planned vendor support

**Example Scenarios**:

Scenario 1: Feature supported differently
```
VLAN Configuration
├─ OPNsense/pfSense: Full 802.1Q support ✓
├─ ASUS: Full VLAN support ✓
├─ TP-Link: Limited via undocumented API ⚠
└─ Netgear: Manual web UI deep-link (external)
```

Scenario 2: Feature not available
```
Advanced Firewall Rules
⚠ This feature requires a device with firewall capabilities.
   Your current devices don't have this feature.
   
   Supported on: OPNsense, pfSense
   Consider adding: OPNsense would give you full firewall control
   Learn more → [link]
```

## Core Feature Set Specifications

### Feature 1: Universal Onboarding

**One-Line Summary**: Auto-discover devices on the local network and guide users through setup with plain-language explanations.

**User Story**: 
- Beginner: "As a homeowner, I want to set up my new router without reading a manual"
- Power User: "As a network admin, I want to quickly onboard multiple devices with custom settings"

**Inspired By**: TP-Link Tether (fast mobile setup), ASUS Router App (mesh setup), Ubiquiti UniFi (device adoption)

**Simplified Flow**:
1. App auto-discovers devices on local network using mDNS/UPnP
2. User selects device from list (with model/vendor shown)
3. Guided setup asks: "What do you want to name your network?" (not "SSID")
4. Password input with strength indicator
5. Security mode selection: WPA3, WPA2, or WPA2/WPA3 (with plain-language explanations)
6. Show preview of all settings
7. Apply configuration and wait for device to reboot
8. Verify successful connection

**Advanced Flow** (behind "Advanced" toggle):
- Manual IP entry if device not auto-discovered
- Channel selection with interference map
- Transmit power settings
- Custom DHCP ranges
- Band steering options
- Remote management toggle
- Firmware version check

**Security Considerations**:
- ✓ Always verify connection before considering setup complete
- ✓ Warn if device uses default credentials
- ✓ Require password change for remote access
- ✓ Show encryption method being used
- ✓ Offer option to disable WPS (Wi-Fi Protected Setup)

**Vendor Compatibility**: All supported vendors

**API Requirements**:
- Device discovery (UPnP/mDNS)
- Network configuration (SSID, password, security mode)
- Reboot command
- Status verification

**Estimated Effort**: Medium (5-7 days)

**Dependencies**: None

---

### Feature 2: Unified Dashboard

**One-Line Summary**: Single-pane overview of entire network across vendors with topology map and health status.

**User Story**: 
- Beginner: "I want to see at a glance if my network is working and how many devices are connected"
- Power User: "I want to see real-time bandwidth usage, device health, and alerts across multiple sites"

**Simplified View**:
- Network topology map (router → switches → APs with visual layout)
- Health status indicators per device (green/yellow/red)
- Total connected devices count
- Internet connection status
- Quick action buttons: "Guest Network", "Add Device", "Help"

**Advanced View** (behind toggle):
- Bandwidth usage per device (pie chart or bar graph)
- CPU/memory utilization of active devices
- Custom metrics and alerts
- Performance history graphs (last 24h, 7d, 30d)
- Detailed device information (IP, MAC, RSSI, throughput)

**Platform Notes**:
- **Mobile**: Swipeable cards for detailed views
- **Desktop**: Resizable panels, multi-window support
- **Tablet**: Two-column layout (dashboard + details)

**Estimated Effort**: Large (10-14 days)

---

### Feature 3: VLAN & Segmentation Wizard

**One-Line Summary**: Create network segments without technical knowledge; advanced controls available for power users.

**Inspired By**: Ubiquiti UniFi (topology + segmentation), OPNsense/pfSense (VLAN tagging)

**Simplified Flow**:
1. Choose template: "Home", "Guests", "Smart Home/IoT", "Work", "Streaming"
2. Name the segment (e.g., "Guest Network")
3. Set access level: "Full Access", "Internet Only", "Block Internet"
4. Password (only for guest networks)
5. Preview which devices will be on this segment
6. Create

**Advanced Flow**:
- Manual VLAN ID entry (1–4094)
- 802.1Q tagging configuration
- Priority/QoS settings (802.1p priority)
- Isolation rules (inter-VLAN traffic)
- IP address assignment (DHCP range, static, etc.)
- DHCP options (DNS servers, lease time)

**Security Defaults**:
- New VLANs isolated by default (strict firewall between VLANs)
- Guest VLANs cannot access NAS, printer, or local devices by default
- Explicit allow-rules required to enable inter-VLAN traffic
- Confirmation required before allowing inter-VLAN communication

**API Requirements**:
- VLAN creation/deletion
- Device membership management
- Isolation rule configuration
- DHCP server settings

**Constraints**:
- Not all vendors support true 802.1Q isolation → may need ACL fallback
- Some older devices lack VLAN API → provide manual configuration guide

**Estimated Effort**: Medium (6-8 days)

---

### Feature 4: Firewall & Security Rules

**One-Line Summary**: Template-based rule creation for common scenarios with advanced raw-rule editor underneath.

**Inspired By**: OPNsense/pfSense (stateful firewall), ASUS Router App (simple rule templates)

**Simplified Flow**:
1. Choose action: "Block", "Allow", "Limit Speed"
2. Choose target: "This device", "All devices", "Specific IP", "Network segment"
3. Choose service: "Internet access", "Printer", "NAS", "Smart TV", "Specific port"
4. Set time: "Always", "Weekdays only", "Custom schedule"
5. Review impact preview (who will be affected)
6. Confirm

**Advanced Flow**:
- Raw rule editor with protocol selection (TCP/UDP/ICMP/Both)
- Manual IP/port entry (CIDR notation, port ranges)
- Direction: Inbound/Outbound/Both
- Rate limiting (Mbps or packets/sec)
- Logging enabled/disabled
- Rule priority/ordering (drag-to-reorder)
- Test mode: Apply for 2 min, then revert auto-confirm

**Safety Features**:
- Impact preview shows "This will disconnect: [device names]"
- Automatic rollback if rule breaks connectivity
- Rule enable/disable toggle (not destructive delete)
- Confirmation required for rules affecting management access

**Vendor Compatibility**:
- Full support: OPNsense, pfSense, ASUS
- Limited support: TP-Link, Netgear (ACL-based)
- Not available: Ubiquiti (use in-UI rules instead)

**Estimated Effort**: Large (10-12 days)

**Dependencies**: VLAN Wizard (for device segmentation context)

---

### Feature 5: Parental Controls & Content Filtering

**One-Line Summary**: Schedule and filter access per device or profile with plain-language options.

**Simplified Flow**:
1. Select device or create profile (e.g., "Kids' Devices")
2. Set access schedule:
   - "Always allowed"
   - "Allowed 6 AM–10 PM"
   - "Custom hours"
3. Choose filtering level: "Off", "Light", "Medium", "Strict"
4. Add approved sites/apps (optional whitelist mode)
5. Review and apply

**Advanced Flow**:
- Custom category filtering (YouTube, Gaming, Social Media, Shopping, etc.)
- IP-based filtering
- DNS-based blocking (Pi-hole style)
- DPI (Deep Packet Inspection) rules
- Time-based bandwidth limits (e.g., "Max 2 GB per day")
- Custom block page with message

**Platform Notes**:
- Mobile: Simplified profile creation
- Desktop: Batch device assignment, export/import profiles

**Estimated Effort**: Large (9-11 days)

---

### Feature 6: Remote & Multi-Site Access

**One-Line Summary**: Secure remote management with clear consent and encryption explanation.

**Inspired By**: Ubiquiti UniFi (hybrid cloud model), ASUS Router App (remote management)

**Key Features**:
- Opt-in cloud sync (disabled by default)
- Clear explanation of what data is sent and how it's encrypted
- Explicit consent required for each feature
- Easy on/off toggle
- Multi-site dashboard
- Secure tunnel (WireGuard/TLS explained)

**Security Defaults**:
- Remote access disabled by default
- 2FA required for cloud access
- Encryption explained to user (AES-256, TLS)
- Data residency options (US/EU/Asia)
- Full activity logging (who accessed what, when)

**UI Pattern**:
```
┌─────────────────────────────────┐
│ Remote Access Settings          │
├─────────────────────────────────┤
│ Remote Management               │
│ ○ Off    ● On                  │
│                                 │
│ ⓘ When enabled, you can manage │
│ this network from anywhere using
│ a secure encrypted connection.  │
│                                 │
│ Data Residency: United States  │
│ [Change] [Learn More]           │
│                                 │
│ Two-Factor Auth: Required      │
│ [Manage]                        │
│                                 │
│ [View Activity Log]             │
└─────────────────────────────────┘
```

**Estimated Effort**: Large (12-15 days)

---

### Feature 7: Guest Network Sharing

**One-Line Summary**: Share network with QR code, auto-isolated from internal devices.

**Inspired By**: ASUS Router App (QR-code sharing)

**Simplified Flow**:
1. Toggle "Share Guest Network" on
2. App generates QR code with SSID and password
3. User shares QR code via photo/message/email
4. Guests scan to auto-connect
5. Optional: Set expiration date

**Advanced Flow**:
- Control bandwidth per guest (throttle speed)
- VLAN assignment
- Access restrictions (no local network access)
- Guest profile selection
- Disable/enable quickly without recreating

**Security**:
- Guest VLAN isolated by default
- No access to NAS, printer, or local devices
- Clear expiration time

**Estimated Effort**: Medium (4-6 days)

---

### Feature 8: Firmware & Update Management

**One-Line Summary**: Unified update center across vendors with fallback to vendor URLs.

**Simplified Flow**:
1. Dashboard shows "Updates Available" if any device has updates
2. List of devices needing updates
3. One-click "Update All" or individual device update
4. Progress indicator
5. Confirmation when complete

**Advanced Flow**:
- Schedule updates for specific times
- Choose update strategy (immediate, wait for stable, beta channel)
- Rollback to previous version
- View release notes
- Compare versions
- Update history

**Fallback Strategy**:
For vendors without API, provide:
- Deep-link to vendor's update page
- Status indicator (checking, available, up-to-date)
- Manual update guide

**Estimated Effort**: Medium (5-7 days)

---

### Feature 9: Diagnostics & Monitoring

**One-Line Summary**: Translate raw metrics into plain-language insights with raw-data view for power users.

**Simplified View**:
- Network health score (0–100)
- Top issues as plain text:
  - "Wi-Fi congestion on 2.4 GHz — consider switching to 5 GHz"
  - "Device losing connection to router"
  - "High CPU usage on gateway"
- Recommended actions
- Last restart time and uptime

**Advanced View** (behind toggle):
- Real-time bandwidth graphs per device
- Packet loss percentage
- Latency per device (min/avg/max)
- DNS query logs
- DHCP lease information
- Raw syslog access
- Performance history (24h, 7d, 30d)
- Export data as CSV

**Estimated Effort**: Large (8-10 days)

---

## Specification Output Format

When the agent generates a specification, it produces this structure:

```json
{
  "featureName": "Feature Name",
  "oneLineSummary": "What the feature does in one sentence",
  "userTier": "beginner | power_user | both",
  "userStory": "As a [user type], I want to [action] so that [outcome]",
  "inspiredBy": "existing_product_name",
  "whatToTake": "Which functionality to extract",
  "whatToImprove": "What needs improvement",
  "simplifiedFlow": {
    "title": "Beginner-Friendly Flow",
    "steps": ["step 1", "step 2", ...],
    "visualDescription": "How the UI looks",
    "interactions": ["interaction pattern 1", ...],
    "validationRules": ["validation logic 1", ...]
  },
  "advancedFlow": {
    "title": "Power User Flow",
    "steps": [...],
    "visualDescription": "Advanced UI appearance",
    "interactions": [...],
    "validationRules": [...]
  },
  "securityConsiderations": ["security aspect 1", ...],
  "vendorCompatibility": ["vendor1", "vendor2", ...],
  "apiRequirements": ["required_api", ...],
  "constraintsAndTradeoffs": ["tradeoff 1", ...],
  "estimatedEffort": "small | medium | large",
  "dependencies": ["feature that must exist first", ...]
}
```

## API Compatibility Analysis

For each vendor and feature, the agent analyzes:

1. **Device Discovery** — mDNS, UPnP, or vendor-specific API
2. **Configuration Read/Write** — Documented API vs. reverse-engineered
3. **Firmware Updates** — Availability and mechanism
4. **VLAN Management** — API support or CLI fallback
5. **Firewall Rules** — Stateful rules, ACLs, or other
6. **VPN Configuration** — WireGuard, OpenVPN, proprietary
7. **Remote Access** — Cloud sync option, hybrid model, or local-only
8. **Diagnostics** — Metrics export, syslog, or manual reading

### API Availability Ratings

| Rating | Description |
|--------|-------------|
| **Documented** | Official API with public documentation, stable, well-supported |
| **Undocumented** | Works but not officially supported (reverse-engineered), may break on updates |
| **Unavailable** | Not possible without hardware hacking or firmware modifications |

### Integration Difficulty Ratings

| Difficulty | Characteristics |
|-----------|-----------------|
| **Easy** | Straightforward REST/SNMP API, good docs, stable, SDK available |
| **Medium** | Some quirks, incomplete docs, needs testing, occasional updates |
| **Hard** | Reverse-engineered, unstable, frequent changes, poor documentation |

## Usage Examples

### Python

```python
from src.agent.spec_generator import SpecificationAgent, VendorType

agent = SpecificationAgent()

# Generate VLAN wizard specification
vlan_spec = agent.generate_vlan_wizard_specification()
print(vlan_spec.feature_name)
print(vlan_spec.simplified_flow.steps)

# Generate onboarding for TP-Link
onboarding = agent.generate_onboarding_flow_for_vendor(VendorType.TP_LINK)
print(onboarding.steps)

# Analyze API compatibility
analysis = agent.analyze_vendor_api_compatibility(
    VendorType.ASUS,
    "Firewall Rules Management"
)
print(analysis['recommended_approach'])
```

### TypeScript

```typescript
import { SpecificationAgent, VendorType } from "./src/agent/spec_generator";

const agent = new SpecificationAgent();

// Generate VLAN wizard specification
const vlanSpec = agent.generateVLANWizardSpecification();
console.log(vlanSpec.featureName);
console.log(vlanSpec.simplifiedFlow.steps);

// Generate onboarding for ASUS
const onboarding = agent.generateOnboardingFlowForVendor(VendorType.ASUS);
console.log(onboarding.steps);

// Analyze API compatibility
const analysis = agent.analyzeVendorAPICompatibility(
  VendorType.OPNsense,
  "Firewall Rules Management"
);
console.log(analysis.recommendedApproach);
```

## Next Steps

1. ✅ Generate specifications for all 9 core features
2. ✅ Create mockups/wireframes based on simplified flows
3. ✅ Implement vendor-specific API adapters
4. ⏳ Build progressive disclosure UI components
5. ⏳ Add plain-language explanation library
6. ⏳ Implement safety confirmations and rollback mechanisms
7. ⏳ Create cross-platform responsive layouts
8. ⏳ Test with both beginner and power users

## References & Inspiration

- **OPNsense**: https://opnsense.org
- **pfSense**: https://www.pfsense.org
- **Ubiquiti UniFi**: https://ubnt.com/products/#unifi
- **TP-Link Tether**: https://www.tp-link.com/us/support/faq/2506/
- **ASUS Router**: https://www.asus.com
- **Netgear**: https://www.netgear.com
- **Cisco**: https://www.cisco.com

---

**Generated by Agentic AI Specification Generator**
*Last Updated: 2026-07-25*
