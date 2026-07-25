/**
 * Agentic specification generator for the unified network configuration app.
 */

export enum PlatformType {
  iOS = "ios",
  Android = "android",
  Web = "web",
  Windows = "windows",
  Linux = "linux",
  macOS = "macos",
}

export enum UserTier {
  Beginner = "beginner",
  PowerUser = "power_user",
  Both = "both",
}

export enum VendorType {
  TPLink = "tp_link",
  ASUS = "asus",
  Netgear = "netgear",
  Ubiquiti = "ubiquiti",
  OPNsense = "opnsense",
  pfSense = "pfsense",
  Cisco = "cisco",
  Generic = "generic",
}

export enum FeatureInspiration {
  OPNsensePfSense = "opnsense_pfsense",
  UbiquitiUniFi = "ubiquiti_unifi",
  TPLinkTether = "tp_link_tether",
  ASUSRouterApp = "asus_router_app",
  Netgear = "netgear",
  Cisco = "cisco",
  Original = "original",
}

export interface FeatureFlow {
  title: string;
  steps: string[];
  visualDescription: string;
  interactions: string[];
  validationRules: string[];
}

export interface PlatformNotes {
  platform: PlatformType;
  considerations: string[];
  uiAdjustments: string[];
  technicalConstraints: string[];
}

export interface FeatureSpecification {
  featureName: string;
  oneLineSummary: string;
  userTier: UserTier;
  userStory: string;
  inspiredBy: FeatureInspiration;
  whatToTake: string;
  whatToImprove: string;
  simplifiedFlow: FeatureFlow;
  advancedFlow?: FeatureFlow;
  platformNotes?: PlatformNotes[];
  securityConsiderations?: string[];
  vendorCompatibility?: VendorType[];
  apiRequirements?: string[];
  constraintsAndTradeoffs?: string[];
  estimatedEffort?: "small" | "medium" | "large";
  dependencies?: string[];
}

export interface APICompatibilityAnalysis {
  vendor: VendorType;
  feature: string;
  apiAnalysis: {
    [key: string]: {
      availability: "documented" | "undocumented" | "unavailable";
      difficulty: "easy" | "medium" | "hard";
    };
  };
  recommendedApproach: string;
  fallbackStrategy: string;
  estimatedIntegrationEffort: string;
}

export class SpecificationAgent {
  private designPrinciples: string[] = [
    "Progressive disclosure — default view is simple",
    "Plain language first — explain all technical terms",
    "Consistency across platforms — no feature split",
    "Safety by default — clear confirmation for risky changes",
    "Vendor abstraction — show which device a setting applies to",
  ];

  constructor() {}

  generateVLANWizardSpecification(): FeatureSpecification {
    return {
      featureName: "VLAN & Segmentation Wizard",
      oneLineSummary:
        "Create network segments with plain-language guidance, advanced controls hidden by default",
      userTier: UserTier.Both,
      userStory:
        "As a beginner, I want to create separate networks for guests and IoT without understanding technical terms",
      inspiredBy: FeatureInspiration.UbiquitiUniFi,
      whatToTake: "Hybrid local+cloud management, multi-site visibility",
      whatToImprove:
        "Made vendor-agnostic, beginner-friendly with progressive disclosure",
      simplifiedFlow: {
        title: "Beginner Flow",
        steps: [
          "1. Choose template: Home, Guests, Smart Home/IoT, Work, or Custom",
          "2. Name the segment (e.g., 'Guest Network')",
          "3. Set password/access level",
          "4. Preview which devices will be on this segment",
          "5. Create and confirm",
        ],
        visualDescription:
          "Clean card-based interface with template selection, simple form fields",
        interactions: [\n          "Tap to select template",\n          "Type segment name",\n          "Toggle access level",\n        ],
        validationRules: [\n          "Name required",\n          "Password strength checked",\n          "No duplicate names",\n        ],
      },
      advancedFlow: {
        title: "Power User Flow",
        steps: [\n          "1. Manual VLAN ID entry (1–4094)",\n          "2. Configure 802.1Q tagging",\n          "3. Set priority/QoS settings",\n          "4. Define isolation rules",\n          "5. Configure traffic restrictions",\n          "6. Choose IP assignment method",\n          "7. Preview and apply",\n        ],
        visualDescription:
          "Tabbed interface with raw VLAN settings, technical configuration options",
        interactions: [\n          "Numeric input for VLAN ID",\n          "Toggle switches",\n          "Advanced rule builder",\n        ],
        validationRules: [\n          "VLAN ID range 1-4094",\n          "No conflicts with existing VLANs",\n          "Proper tagging configuration",\n        ],
      },
      securityConsiderations: [\n        "New VLANs isolated by default",\n        "Guest VLANs cannot access NAS/printer by default",\n        "Explicit allow-rules required for inter-VLAN traffic",\n        "Clear warning before allowing VLAN bridging",\n      ],
      vendorCompatibility: [\n        VendorType.TPLink,\n        VendorType.ASUS,\n        VendorType.Netgear,\n        VendorType.Ubiquiti,\n      ],
      apiRequirements: [\n        "VLAN configuration API",\n        "Device membership query",\n        "Isolation rule support",\n      ],
      constraintsAndTradeoffs: [\n        "Not all vendors support true 802.1Q isolation — may need access control fallback",\n        "Some older TP-Link devices lack VLAN API — provide manual configuration guide",\n      ],
      estimatedEffort: "medium",
      dependencies: [],
    };
  }

  generateFirewallRulesSpecification(): FeatureSpecification {
    return {
      featureName: "Firewall & Security Rules",
      oneLineSummary:
        "Template-based security rules with plain-language descriptions and impact preview",
      userTier: UserTier.Both,
      userStory:
        "As a power user, I want to block specific devices or apps from the internet, but I want to see the impact before applying",
      inspiredBy: FeatureInspiration.OPNsensePfSense,
      whatToTake: "Stateful firewall engine, customizable rules, real-time impact",
      whatToImprove:
        "Simplified for beginners with templates; clear previews before applying; easy rollback",
      simplifiedFlow: {
        title: "Beginner Flow",
        steps: [\n          "1. Choose action: Block, Allow, or Limit",\n          "2. Choose target: This device, All devices, or Custom IP",\n          "3. Choose service: Internet, Printer, NAS, Smart TV, or Specific port",\n          "4. Set time: Always, Weekdays only, or Custom hours",\n          "5. Review impact preview (who will be affected)",\n          "6. Confirm or cancel",\n        ],
        visualDescription:
          "Large buttons for common actions, dropdown selectors, visual confirmation screen",
        interactions: [\n          "Tap to select action",\n          "Dropdown for service selection",\n          "Time picker for scheduling",\n        ],
        validationRules: [\n          "Action selected",\n          "Target specified",\n          "No conflicting rules",\n        ],
      },
      advancedFlow: {
        title: "Power User Flow",
        steps: [\n          "1. Raw rule editor with protocol selection (TCP/UDP/ICMP)",\n          "2. Manual IP/port entry",\n          "3. Set direction (inbound/outbound/both)",\n          "4. Configure rate limiting",\n          "5. Enable logging",\n          "6. Set rule priority/ordering",\n          "7. Test mode (2-minute auto-rollback)",\n          "8. Confirm",\n        ],
        visualDescription:
          "Code-like rule editor with syntax highlighting, priority drag-and-drop ordering",
        interactions: [\n          "Text input for rules",\n          "Drag to reorder",\n          "Toggle for enable/disable",\n          "Test button",\n        ],
        validationRules: [\n          "Valid protocol",\n          "Port range check",\n          "No duplicate rules",\n          "Syntax validation",\n        ],
      },
      securityConsiderations: [\n        "Impact preview must show disconnected devices clearly",\n        "Automatic rollback if rule breaks connectivity",\n        "Rule enable/disable toggle (not destructive delete)",\n        "Test mode: apply for 2 min, then revert auto-confirm",\n        "Require confirmation for rules affecting management access",\n      ],
      vendorCompatibility: [\n        VendorType.OPNsense,\n        VendorType.pfSense,\n        VendorType.ASUS,\n      ],
      apiRequirements: [\n        "Firewall rule API",\n        "Real-time rule status",\n        "Rollback capability",\n      ],
      constraintsAndTradeoffs: [\n        "OPNsense/pfSense have full stateful firewall; ASUS/TP-Link use ACLs (less powerful)",\n        "Some vendors lack rollback API — implement manual backup/restore",\n        "Rate limiting not supported on all platforms — show as 'advanced feature'",\n      ],
      estimatedEffort: "large",
      dependencies: ["VLAN wizard (for device segmentation context)"],
    };
  }

  generateOnboardingFlowForVendor(vendor: VendorType): FeatureFlow {
    const flows: Record<VendorType, FeatureFlow> = {
      [VendorType.TPLink]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. App discovers TP-Link device via UPnP",\n          "2. Connect to device's default AP or specify IP",\n          "3. Ask for network name (SSID)",\n          "4. Ask for password with strength meter",\n          "5. Show security mode options (WPA3, WPA2+WPA3)",\n          "6. Preview all settings",\n          "7. Apply and wait for device to reboot",\n          "8. Confirm successful connection",\n        ],
        visualDescription:
          "Large buttons, simple form with one question per screen, progress indicator",
        interactions: [\n          "Auto-discovery tap",\n          "Text input",\n          "Radio buttons for security",\n          "Confirmation button",\n        ],
        validationRules: [\n          "Device reachable",\n          "SSID not empty",\n          "Password meets requirements",\n        ],
      },
      [VendorType.ASUS]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. Auto-discover ASUS router via mDNS",\n          "2. Show nearby network name (pre-filled from device)",\n          "3. Ask for new password",\n          "4. Ask for admin credentials (if required)",\n          "5. Preview SSID, password, and security settings",\n          "6. Ask about mesh (if AiMesh capable)",\n          "7. Apply configuration",\n          "8. Confirmation with next steps (add more nodes, invite family)",\n        ],
        visualDescription:
          "Beautiful card layout, mesh setup wizard, QR code for quick share",
        interactions: [\n          "Tap to auto-fill SSID",\n          "Password input",\n          "Toggle for mesh",\n          "Share QR code",\n        ],
        validationRules: [\n          "Admin auth if needed",\n          "Valid password format",\n          "Network name unique",\n        ],
      },
      [VendorType.Generic]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. Manual IP entry (if not auto-discovered)",\n          "2. Enter admin username/password",\n          "3. Verify device connectivity",\n          "4. Show available configuration options",\n          "5. Ask for network settings (SSID, password)",\n          "6. Show compatibility warnings",\n          "7. Apply with fallback to web UI if needed",\n        ],
        visualDescription:
          "Manual entry form, warnings for limited support, fallback to vendor UI",
        interactions: [\n          "Text input for IP",\n          "Credential entry",\n          "Manual setting configuration",\n        ],
        validationRules: [\n          "Valid IP format",\n          "Credentials verified",\n          "Device model detected",\n        ],
      },
      [VendorType.Netgear]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. Discover Netgear device via UPnP",\n          "2. Request admin password",\n          "3. Show SSID and password fields",\n          "4. Ask for security preference",\n          "5. Preview settings",\n          "6. Apply and confirm",\n        ],
        visualDescription: "Simple form interface with security presets",
        interactions: ["Discovery", "Password entry", "Settings selection"],
        validationRules: ["Device found", "Admin auth verified"],
      },
      [VendorType.Ubiquiti]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. Connect via UniFi controller discovery",\n          "2. Show device adoption wizard",\n          "3. Configure network settings",\n          "4. Join to existing site or create new",\n          "5. Setup completed in cloud dashboard",\n        ],
        visualDescription: "UniFi cloud integration wizard",
        interactions: ["Discovery", "Site selection", "Network config"],
        validationRules: ["Device adoptable", "Cloud sync working"],
      },
      [VendorType.OPNsense]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. Detect OPNsense instance on network",\n          "2. Enter admin credentials",\n          "3. Basic network setup wizard",\n          "4. Configure WAN/LAN interfaces",\n          "5. Set SSID if AP enabled",\n          "6. Advanced settings available",\n        ],
        visualDescription: "Professional network administration interface",
        interactions: [\n          "IP entry",\n          "Credential verification",\n          "Network configuration",\n        ],
        validationRules: ["OPNsense detected", "Auth successful"],
      },
      [VendorType.pfSense]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. Detect pfSense instance",\n          "2. Similar to OPNsense setup",\n          "3. WAN/LAN configuration",\n          "4. Basic security setup",\n        ],
        visualDescription: "Professional network administration interface",
        interactions: ["IP entry", "Credential verification"],
        validationRules: ["pfSense detected"],
      },
      [VendorType.Cisco]: {
        title: `Onboarding - ${vendor}`,
        steps: [\n          "1. Detect Cisco device",\n          "2. Enterprise auth (SNMP/SSH)",\n          "3. Show supported configuration options",\n          "4. Limited feature set for consumer use",\n        ],
        visualDescription: "Enterprise network device configuration",
        interactions: ["Device detection", "Enterprise auth"],
        validationRules: ["Cisco device verified"],
      },
    };

    return flows[vendor] || flows[VendorType.Generic];
  }

  analyzeVendorAPICompatibility(
    vendor: VendorType,
    feature: string
  ): APICompatibilityAnalysis {
    const analysisMatrix: Record<
      VendorType,
      Record<
        string,
        { availability: "documented" | "undocumented" | "unavailable"; difficulty: "easy" | "medium" | "hard" }
      >
    > = {
      [VendorType.TPLink]: {
        discovery: { availability: "documented", difficulty: "easy" },
        configuration: { availability: "documented", difficulty: "medium" },
        firmware: { availability: "documented", difficulty: "easy" },
        vlan: { availability: "undocumented", difficulty: "hard" },
        firewall: { availability: "documented", difficulty: "medium" },
        vpn: { availability: "undocumented", difficulty: "hard" },
        remote_access: { availability: "documented", difficulty: "medium" },
        diagnostics: { availability: "documented", difficulty: "easy" },
      },
      [VendorType.ASUS]: {
        discovery: { availability: "documented", difficulty: "easy" },
        configuration: { availability: "documented", difficulty: "medium" },
        firmware: { availability: "documented", difficulty: "easy" },
        vlan: { availability: "documented", difficulty: "medium" },
        firewall: { availability: "documented", difficulty: "medium" },
        vpn: { availability: "documented", difficulty: "medium" },
        remote_access: { availability: "documented", difficulty: "medium" },
        diagnostics: { availability: "documented", difficulty: "medium" },
      },
      [VendorType.OPNsense]: {
        discovery: { availability: "documented", difficulty: "easy" },
        configuration: { availability: "documented", difficulty: "medium" },
        firmware: { availability: "documented", difficulty: "easy" },
        vlan: { availability: "documented", difficulty: "medium" },
        firewall: { availability: "documented", difficulty: "easy" },
        vpn: { availability: "documented", difficulty: "medium" },
        remote_access: { availability: "documented", difficulty: "hard" },
        diagnostics: { availability: "documented", difficulty: "easy" },
      },
      [VendorType.pfSense]: {
        discovery: { availability: "documented", difficulty: "easy" },
        configuration: { availability: "documented", difficulty: "medium" },
        firmware: { availability: "documented", difficulty: "easy" },
        vlan: { availability: "documented", difficulty: "medium" },
        firewall: { availability: "documented", difficulty: "easy" },
        vpn: { availability: "documented", difficulty: "medium" },
        remote_access: { availability: "documented", difficulty: "hard" },
        diagnostics: { availability: "documented", difficulty: "easy" },
      },
      [VendorType.Ubiquiti]: {
        discovery: { availability: "documented", difficulty: "easy" },
        configuration: { availability: "documented", difficulty: "easy" },
        firmware: { availability: "documented", difficulty: "easy" },
        vlan: { availability: "documented", difficulty: "easy" },
        firewall: { availability: "documented", difficulty: "medium" },
        vpn: { availability: "documented", difficulty: "medium" },
        remote_access: { availability: "documented", difficulty: "easy" },
        diagnostics: { availability: "documented", difficulty: "easy" },
      },
      [VendorType.Netgear]: {
        discovery: { availability: "documented", difficulty: "easy" },
        configuration: { availability: "documented", difficulty: "medium" },
        firmware: { availability: "documented", difficulty: "medium" },
        vlan: { availability: "undocumented", difficulty: "hard" },
        firewall: { availability: "documented", difficulty: "medium" },
        vpn: { availability: "undocumented", difficulty: "hard" },
        remote_access: { availability: "documented", difficulty: "medium" },
        diagnostics: { availability: "documented", difficulty: "medium" },
      },
      [VendorType.Cisco]: {
        discovery: { availability: "documented", difficulty: "medium" },
        configuration: { availability: "documented", difficulty: "hard" },
        firmware: { availability: "documented", difficulty: "hard" },
        vlan: { availability: "documented", difficulty: "medium" },
        firewall: { availability: "documented", difficulty: "medium" },
        vpn: { availability: "documented", difficulty: "hard" },
        remote_access: { availability: "documented", difficulty: "hard" },
        diagnostics: { availability: "documented", difficulty: "medium" },
      },
      [VendorType.Generic]: {
        discovery: { availability: "undocumented", difficulty: "hard" },
        configuration: { availability: "undocumented", difficulty: "hard" },
        firmware: { availability: "undocumented", difficulty: "hard" },
        vlan: { availability: "unavailable", difficulty: "hard" },
        firewall: { availability: "undocumented", difficulty: "hard" },
        vpn: { availability: "unavailable", difficulty: "hard" },
        remote_access: { availability: "unavailable", difficulty: "hard" },
        diagnostics: { availability: "undocumented", difficulty: "hard" },
      },
    };

    return {
      vendor,
      feature,
      apiAnalysis: analysisMatrix[vendor] || analysisMatrix[VendorType.Generic],
      recommendedApproach: `Use vendor's official REST API for ${vendor}`,
      fallbackStrategy: "Web UI deep-link if API unavailable",
      estimatedIntegrationEffort: "3-5 days",
    };
  }
}

// Example usage
if (require.main === module) {
  const agent = new SpecificationAgent();

  console.log("\n" + "=".repeat(80));
  console.log("VLAN WIZARD SPECIFICATION");
  console.log("=".repeat(80) + "\n");
  const vlanSpec = agent.generateVLANWizardSpecification();
  console.log(JSON.stringify(vlanSpec, null, 2));

  console.log("\n" + "=".repeat(80));
  console.log("FIREWALL RULES SPECIFICATION");
  console.log("=".repeat(80) + "\n");
  const firewallSpec = agent.generateFirewallRulesSpecification();
  console.log(JSON.stringify(firewallSpec, null, 2));

  console.log("\n" + "=".repeat(80));
  console.log("ONBOARDING FLOW FOR TP-LINK");
  console.log("=".repeat(80) + "\n");
  const onboardingFlow = agent.generateOnboardingFlowForVendor(
    VendorType.TPLink
  );
  console.log(JSON.stringify(onboardingFlow, null, 2));
}
