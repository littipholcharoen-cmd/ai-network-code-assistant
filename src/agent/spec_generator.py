"""Agentic specification generator for the unified network configuration app."""
import json
from typing import Optional
from dataclasses import dataclass, asdict
from enum import Enum
from loguru import logger
from src.agent.config import config

class PlatformType(str, Enum):
    """Supported platforms."""
    iOS = "ios"
    ANDROID = "android"
    WEB = "web"
    WINDOWS = "windows"
    LINUX = "linux"
    MACOS = "macos"

class UserTier(str, Enum):
    """User experience level."""
    BEGINNER = "beginner"
    POWER_USER = "power_user"
    BOTH = "both"

class VendorType(str, Enum):
    """Supported network vendors."""
    TP_LINK = "tp_link"
    ASUS = "asus"
    NETGEAR = "netgear"
    UBIQUITI = "ubiquiti"
    OPNSENSE = "opnsense"
    PFSENSE = "pfsense"
    CISCO = "cisco"
    GENERIC = "generic"

class FeatureInspiration(str, Enum):
    """Which existing product inspired this feature."""
    OPNSENSE_PFSENSE = "opnsense_pfsense"
    UBIQUITI_UNIFI = "ubiquiti_unifi"
    TP_LINK_TETHER = "tp_link_tether"
    ASUS_ROUTER_APP = "asus_router_app"
    NETGEAR = "netgear"
    CISCO = "cisco"
    ORIGINAL = "original"

@dataclass
class FeatureFlow:
    """Definition of a feature flow (simplified or advanced)."""
    title: str
    steps: list
    visual_description: str
    interactions: list
    validation_rules: list

@dataclass
class PlatformNotes:
    """Platform-specific implementation notes."""
    platform: PlatformType
    considerations: list
    ui_adjustments: list
    technical_constraints: list

@dataclass
class FeatureSpecification:
    """Complete feature specification."""
    feature_name: str
    one_line_summary: str
    user_tier: UserTier
    user_story: str
    inspired_by: FeatureInspiration
    what_to_take: str
    what_to_improve: str
    simplified_flow: FeatureFlow
    advanced_flow: Optional[FeatureFlow] = None
    platform_notes: list = None
    security_considerations: list = None
    vendor_compatibility: list = None
    api_requirements: list = None
    constraints_and_tradeoffs: list = None
    estimated_effort: str = "medium"
    dependencies: list = None

    def to_dict(self):
        """Convert to dictionary for JSON serialization."""
        data = asdict(self)
        data['user_tier'] = self.user_tier.value
        data['inspired_by'] = self.inspired_by.value
        data['vendor_compatibility'] = [v.value for v in self.vendor_compatibility] if self.vendor_compatibility else []
        return data

class SpecificationAgent:
    """AI agent that generates feature specifications."""

    def __init__(self):
        """Initialize the specification agent."""
        self.logger = logger
        self.design_principles = [
            "Progressive disclosure — default view is simple",
            "Plain language first — explain all technical terms",
            "Consistency across platforms — no feature split",
            "Safety by default — clear confirmation for risky changes",
            "Vendor abstraction — show which device a setting applies to",
        ]

    def generate_vlan_wizard_specification(self) -> FeatureSpecification:
        """Generate the VLAN & segmentation wizard specification."""
        self.logger.info("Generating VLAN wizard specification")

        return FeatureSpecification(
            feature_name="VLAN & Segmentation Wizard",
            one_line_summary="Create network segments with plain-language guidance, advanced controls hidden by default",
            user_tier=UserTier.BOTH,
            user_story="As a beginner, I want to create separate networks for guests and IoT without understanding technical terms",
            inspired_by=FeatureInspiration.UBIQUITI_UNIFI,
            what_to_take="Hybrid local+cloud management, multi-site visibility",
            what_to_improve="Made vendor-agnostic, beginner-friendly with progressive disclosure",
            simplified_flow=FeatureFlow(
                title="Beginner Flow",
                steps=[
                    "1. Choose template: Home, Guests, Smart Home/IoT, Work, or Custom",
                    "2. Name the segment (e.g., 'Guest Network')",
                    "3. Set password/access level",
                    "4. Preview which devices will be on this segment",
                    "5. Create and confirm"
                ],
                visual_description="Clean card-based interface with template selection, simple form fields",
                interactions=["Tap to select template", "Type segment name", "Toggle access level"],
                validation_rules=["Name required", "Password strength checked", "No duplicate names"]
            ),
            advanced_flow=FeatureFlow(
                title="Power User Flow",
                steps=[
                    "1. Manual VLAN ID entry (1–4094)",
                    "2. Configure 802.1Q tagging",
                    "3. Set priority/QoS settings",
                    "4. Define isolation rules",
                    "5. Configure traffic restrictions",
                    "6. Choose IP assignment method",
                    "7. Preview and apply"
                ],
                visual_description="Tabbed interface with raw VLAN settings, technical configuration options",
                interactions=["Numeric input for VLAN ID", "Toggle switches", "Advanced rule builder"],
                validation_rules=["VLAN ID range 1-4094", "No conflicts with existing VLANs", "Proper tagging configuration"]
            ),
            security_considerations=[
                "New VLANs isolated by default",
                "Guest VLANs cannot access NAS/printer by default",
                "Explicit allow-rules required for inter-VLAN traffic",
                "Clear warning before allowing VLAN bridging"
            ],
            vendor_compatibility=[VendorType.TP_LINK, VendorType.ASUS, VendorType.NETGEAR, VendorType.UBIQUITI],
            api_requirements=["VLAN configuration API", "Device membership query", "Isolation rule support"],
            constraints_and_tradeoffs=[
                "Not all vendors support true 802.1Q isolation — may need access control fallback",
                "Some older TP-Link devices lack VLAN API — provide manual configuration guide"
            ],
            estimated_effort="medium",
            dependencies=[]
        )

    def generate_firewall_rules_specification(self) -> FeatureSpecification:
        """Generate the firewall & security rules specification."""
        self.logger.info("Generating firewall rules specification")

        return FeatureSpecification(
            feature_name="Firewall & Security Rules",
            one_line_summary="Template-based security rules with plain-language descriptions and impact preview",
            user_tier=UserTier.BOTH,
            user_story="As a power user, I want to block specific devices or apps from the internet, but I want to see the impact before applying",
            inspired_by=FeatureInspiration.OPNSENSE_PFSENSE,
            what_to_take="Stateful firewall engine, customizable rules, real-time impact",
            what_to_improve="Simplified for beginners with templates; clear previews before applying; easy rollback",
            simplified_flow=FeatureFlow(
                title="Beginner Flow",
                steps=[
                    "1. Choose action: Block, Allow, or Limit",
                    "2. Choose target: This device, All devices, or Custom IP",
                    "3. Choose service: Internet, Printer, NAS, Smart TV, or Specific port",
                    "4. Set time: Always, Weekdays only, or Custom hours",
                    "5. Review impact preview (who will be affected)",
                    "6. Confirm or cancel"
                ],
                visual_description="Large buttons for common actions, dropdown selectors, visual confirmation screen",
                interactions=["Tap to select action", "Dropdown for service selection", "Time picker for scheduling"],
                validation_rules=["Action selected", "Target specified", "No conflicting rules"]
            ),
            advanced_flow=FeatureFlow(
                title="Power User Flow",
                steps=[
                    "1. Raw rule editor with protocol selection (TCP/UDP/ICMP)",
                    "2. Manual IP/port entry",
                    "3. Set direction (inbound/outbound/both)",
                    "4. Configure rate limiting",
                    "5. Enable logging",
                    "6. Set rule priority/ordering",
                    "7. Test mode (2-minute auto-rollback)",
                    "8. Confirm"
                ],
                visual_description="Code-like rule editor with syntax highlighting, priority drag-and-drop ordering",
                interactions=["Text input for rules", "Drag to reorder", "Toggle for enable/disable", "Test button"],
                validation_rules=["Valid protocol", "Port range check", "No duplicate rules", "Syntax validation"]
            ),
            security_considerations=[
                "Impact preview must show disconnected devices clearly",
                "Automatic rollback if rule breaks connectivity",
                "Rule enable/disable toggle (not destructive delete)",
                "Test mode: apply for 2 min, then revert auto-confirm",
                "Require confirmation for rules affecting management access"
            ],
            vendor_compatibility=[VendorType.OPNSENSE, VendorType.PFSENSE, VendorType.ASUS],
            api_requirements=["Firewall rule API", "Real-time rule status", "Rollback capability"],
            constraints_and_tradeoffs=[
                "OPNsense/pfSense have full stateful firewall; ASUS/TP-Link use ACLs (less powerful)",
                "Some vendors lack rollback API — implement manual backup/restore",
                "Rate limiting not supported on all platforms — show as 'advanced feature'"
            ],
            estimated_effort="large",
            dependencies=["VLAN wizard (for device segmentation context)"]
        )

    def generate_onboarding_flow_for_vendor(self, vendor: VendorType) -> FeatureFlow:
        """Generate vendor-specific onboarding flow."""
        self.logger.info(f"Generating onboarding flow for {vendor.value}")

        flows = {
            VendorType.TP_LINK: FeatureFlow(
                title=f"Onboarding - {vendor.value}",
                steps=[
                    "1. App discovers TP-Link device via UPnP",
                    "2. Connect to device's default AP or specify IP",
                    "3. Ask for network name (SSID)",
                    "4. Ask for password with strength meter",
                    "5. Show security mode options (WPA3, WPA2+WPA3)",
                    "6. Preview all settings",
                    "7. Apply and wait for device to reboot",
                    "8. Confirm successful connection"
                ],
                visual_description="Large buttons, simple form with one question per screen, progress indicator",
                interactions=["Auto-discovery tap", "Text input", "Radio buttons for security", "Confirmation button"],
                validation_rules=["Device reachable", "SSID not empty", "Password meets requirements"]
            ),
            VendorType.ASUS: FeatureFlow(
                title=f"Onboarding - {vendor.value}",
                steps=[
                    "1. Auto-discover ASUS router via mDNS",
                    "2. Show nearby network name (pre-filled from device)",
                    "3. Ask for new password",
                    "4. Ask for admin credentials (if required)",
                    "5. Preview SSID, password, and security settings",
                    "6. Ask about mesh (if AiMesh capable)",
                    "7. Apply configuration",
                    "8. Confirmation with next steps (add more nodes, invite family)"
                ],
                visual_description="Beautiful card layout, mesh setup wizard, QR code for quick share",
                interactions=["Tap to auto-fill SSID", "Password input", "Toggle for mesh", "Share QR code"],
                validation_rules=["Admin auth if needed", "Valid password format", "Network name unique"]
            ),
            VendorType.GENERIC: FeatureFlow(
                title=f"Onboarding - {vendor.value}",
                steps=[
                    "1. Manual IP entry (if not auto-discovered)",
                    "2. Enter admin username/password",
                    "3. Verify device connectivity",
                    "4. Show available configuration options",
                    "5. Ask for network settings (SSID, password)",
                    "6. Show compatibility warnings",
                    "7. Apply with fallback to web UI if needed"
                ],
                visual_description="Manual entry form, warnings for limited support, fallback to vendor UI",
                interactions=["Text input for IP", "Credential entry", "Manual setting configuration"],
                validation_rules=["Valid IP format", "Credentials verified", "Device model detected"]
            )
        }

        return flows.get(vendor, flows[VendorType.GENERIC])

    def analyze_vendor_api_compatibility(self, vendor: VendorType, feature: str) -> dict:
        """Analyze which APIs are available for a specific vendor and feature."""
        self.logger.info(f"Analyzing {vendor.value} API compatibility for {feature}")

        analysis_matrix = {
            VendorType.TP_LINK: {
                "discovery": {"availability": "documented", "difficulty": "easy"},
                "configuration": {"availability": "documented", "difficulty": "medium"},
                "firmware": {"availability": "documented", "difficulty": "easy"},
                "vlan": {"availability": "undocumented", "difficulty": "hard"},
                "firewall": {"availability": "documented", "difficulty": "medium"},
                "vpn": {"availability": "undocumented", "difficulty": "hard"},
                "remote_access": {"availability": "documented", "difficulty": "medium"},
                "diagnostics": {"availability": "documented", "difficulty": "easy"}
            },
            VendorType.ASUS: {
                "discovery": {"availability": "documented", "difficulty": "easy"},
                "configuration": {"availability": "documented", "difficulty": "medium"},
                "firmware": {"availability": "documented", "difficulty": "easy"},
                "vlan": {"availability": "documented", "difficulty": "medium"},
                "firewall": {"availability": "documented", "difficulty": "medium"},
                "vpn": {"availability": "documented", "difficulty": "medium"},
                "remote_access": {"availability": "documented", "difficulty": "medium"},
                "diagnostics": {"availability": "documented", "difficulty": "medium"}
            },
            VendorType.OPNSENSE: {
                "discovery": {"availability": "documented", "difficulty": "easy"},
                "configuration": {"availability": "documented", "difficulty": "medium"},
                "firmware": {"availability": "documented", "difficulty": "easy"},
                "vlan": {"availability": "documented", "difficulty": "medium"},
                "firewall": {"availability": "documented", "difficulty": "easy"},
                "vpn": {"availability": "documented", "difficulty": "medium"},
                "remote_access": {"availability": "documented", "difficulty": "hard"},
                "diagnostics": {"availability": "documented", "difficulty": "easy"}
            }
        }

        return {
            "vendor": vendor.value,
            "feature": feature,
            "api_analysis": analysis_matrix.get(vendor, {}),
            "recommended_approach": f"Use vendor's official REST API for {vendor.value}",
            "fallback_strategy": "Web UI deep-link if API unavailable",
            "estimated_integration_effort": "3-5 days"
        }

if __name__ == "__main__":
    agent = SpecificationAgent()
    
    print("\n" + "="*80)
    print("VLAN WIZARD SPECIFICATION")
    print("="*80 + "\n")
    vlan_spec = agent.generate_vlan_wizard_specification()
    print(json.dumps(vlan_spec.to_dict(), indent=2))
    
    print("\n" + "="*80)
    print("FIREWALL RULES SPECIFICATION")
    print("="*80 + "\n")
    firewall_spec = agent.generate_firewall_rules_specification()
    print(json.dumps(firewall_spec.to_dict(), indent=2))
