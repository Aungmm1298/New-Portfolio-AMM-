import { useEffect, useRef, useState } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  
  // Real-time metric states for the glassmorphic panels
  const [metrics, setMetrics] = useState({
    reqRate: 1342,
    latency: 12,
    nodesActive: 12,
    cpuLoad: 14,
    uptime: 99.9992,
  });

  // Rolling pipeline/terminal logs state
  const [logs, setLogs] = useState([
    "[ok] api-gateway: initial setup completed successfully",
    "[info] load-balancer: traffic balanced: us-east-1 (60%), ap-southeast-1 (40%)",
    "[ok] vpn-tunnel: secured connection established with transit-gateway",
  ]);

  // Handle real-time stat simulation and rolling logs
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setMetrics((prev) => {
        const deltaReq = Math.floor(Math.random() * 30) - 15;
        const newReq = Math.max(1250, Math.min(1450, prev.reqRate + deltaReq));
        
        const deltaLatency = Math.floor(Math.random() * 3) - 1;
        const newLatency = Math.max(10, Math.min(14, prev.latency + deltaLatency));

        const deltaCpu = Math.floor(Math.random() * 4) - 2;
        const newCpu = Math.max(10, Math.min(20, prev.cpuLoad + deltaCpu));

        const newUptime = Math.min(100.0, prev.uptime + 0.00001 * (Math.random() > 0.85 ? 1 : 0));

        return {
          reqRate: newReq,
          latency: newLatency,
          nodesActive: 12,
          cpuLoad: newCpu,
          uptime: parseFloat(newUptime.toFixed(5)),
        };
      });
    }, 2000);

    const logMessages = [
      "LOAD-BALANCER: distributed HTTP load to subnet-0ea29",
      "K8S-CLUSTER: reconciled pod count, 12 replicas ready",
      "SECURITY-LOCK: audit logs checked, encryption TLSv1.3 verified",
      "S3-STORAGE: synced database dumps to target storage bucket",
      "CI-CD: pipeline stage 'Deploy' executed in 4.2s (SUCCESS)",
      "API-GATEWAY: token verification successful for service 'auth'",
      "MONITOR: API response latency stable at 11ms",
      "CONTAINER-RUNTIME: pulled image nginx:1.25-alpine (12MB)",
    ];

    const logsInterval = setInterval(() => {
      const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const logLine = `[${timeStr}] ${randomMsg}`;

      setLogs((prev) => {
        const nextLogs = [...prev, logLine];
        if (nextLogs.length > 4) nextLogs.shift();
        return nextLogs;
      });
    }, 4500);

    return () => {
      clearInterval(statsInterval);
      clearInterval(logsInterval);
    };
  }, []);

  // Sparkline chart data simulation
  const [sparklineData, setSparklineData] = useState([35, 42, 38, 48, 55, 48, 52, 60, 58, 62]);
  useEffect(() => {
    const sparkInterval = setInterval(() => {
      setSparklineData((prev) => {
        const nextData = [...prev.slice(1)];
        const nextVal = Math.max(20, Math.min(80, prev[prev.length - 1] + (Math.random() * 12 - 6)));
        nextData.push(Math.round(nextVal));
        return nextData;
      });
    }, 2000);
    return () => clearInterval(sparkInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Dimensions
    let width = 0;
    let height = 0;

    // Configuration - Minimalist slow-motion setup
    const connectionDist = 135;
    const wanderRadius = 30;
    const maxVelocity = 0.15; // slow drift speed

    // Simulation Arrays
    let nodes = [];
    let binaryParticles = [];
    let clouds = [];
    let packets = [];
    let cylinderPulse = 0;
    let blinkStates = [true, false, true];
    let lastBlinkTime = 0;

    // Guided "deployment workflow" comet - traces a realistic build-to-runtime path
    // across the infrastructure so the animation tells an actual DevOps story.
    const workflowStages = [
      { key: "cicd", label: "CI/CD \u00b7 Build & Deploy", color: "96, 165, 250" },
      { key: "containers", label: "Containers \u00b7 Pull Image", color: "96, 165, 250" },
      { key: "k8s", label: "Kubernetes \u00b7 Schedule Pods", color: "56, 189, 248" },
      { key: "alb", label: "Load Balancer \u00b7 Route Traffic", color: "56, 189, 248" },
      { key: "apiGw", label: "API Gateway \u00b7 Authenticate", color: "56, 189, 248" },
      { key: "db", label: "Database \u00b7 Query Data", color: "14, 165, 233" },
      { key: "s3", label: "Cloud Storage \u00b7 Persist Backup", color: "56, 189, 248" },
      { key: "monitor", label: "Monitoring \u00b7 Collect Metrics", color: "168, 85, 247" },
      { key: "vpn", label: "Secure Tunnel \u00b7 Encrypt & Close", color: "168, 85, 247" },
    ];
    let workflowIndex = 0;
    let workflowProgress = 0;
    const workflowArrivals = {};

    // Mouse coordinates for parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Generate drawing assets
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initElements();
    };

    const initElements = () => {
      // 1. Topology Grid Nodes
      nodes = [];
      const cols = 6;
      const rows = 6;
      const cellW = width / cols;
      const cellH = height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = cellW * (c + 0.5);
          const baseY = cellH * (r + 0.5);
          
          nodes.push({
            x: baseX + (Math.random() - 0.5) * wanderRadius * 2,
            y: baseY + (Math.random() - 0.5) * wanderRadius * 2,
            baseX,
            baseY,
            vx: (Math.random() - 0.5) * maxVelocity,
            vy: (Math.random() - 0.5) * maxVelocity,
            radius: Math.random() * 1.5 + 0.8,
            pulseOffset: Math.random() * Math.PI * 2,
          });
        }
      }

      // Add a couple of free-floating nodes for randomness
      for (let i = 0; i < 4; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: null,
          baseY: null,
          vx: (Math.random() - 0.5) * maxVelocity * 1.2,
          vy: (Math.random() - 0.5) * maxVelocity * 1.2,
          radius: Math.random() * 2.0 + 0.8,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }

      // 2. Binary Particles
      binaryParticles = [];
      const particleCount = 18;
      for (let i = 0; i < particleCount; i++) {
        binaryParticles.push({
          x: Math.random() * width,
          y: height + Math.random() * 100,
          vy: -(Math.random() * 0.12 + 0.05), // slower vertical drift
          value: Math.random() > 0.5 ? "1" : "0",
          opacity: Math.random() * 0.04 + 0.015,
          size: Math.floor(Math.random() * 2) + 9,
        });
      }

      // 3. Floating Cloud Outlines
      clouds = [
        { x: width * 0.12, y: height * 0.28, scale: 0.22, vx: 0.02, opacity: 0.025 },
        { x: width * 0.72, y: height * 0.58, scale: 0.18, vx: 0.015, opacity: 0.02 },
        { x: width * 0.42, y: height * 0.76, scale: 0.26, vx: 0.025, opacity: 0.03 },
      ];

      packets = [];
    };

    // Blueprint grid system
    const drawGeometricGrid = () => {
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.02)"; // cyan grid
      ctx.lineWidth = 0.5;
      
      const gridSize = 100;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Intersect dots
      ctx.fillStyle = "rgba(56, 189, 248, 0.04)";
      for (let x = gridSize; x < width; x += gridSize) {
        for (let y = gridSize; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // Faint hexagonal grid confined to the far corners, evoking a
    // microservices/distributed-systems mesh without crowding the center.
    const drawHexGrid = (time) => {
      ctx.save();
      const hexSize = 34;
      const hexW = hexSize * 2;
      const hexH = Math.sqrt(3) * hexSize;
      const drift = Math.sin(time * 0.00006) * 6;

      const drawHex = (cx, cy, alpha) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i + Math.PI / 6;
          const x = cx + Math.cos(angle) * hexSize;
          const y = cy + Math.sin(angle) * hexSize;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.stroke();
      };

      // Corner zones only (top-left & bottom-right) so the center stays clear
      const zones = [
        { originX: -hexW * 0.5 + drift, originY: -hexH * 0.5, cols: 5, rows: 5 },
        { originX: width - hexW * 4.5 + drift, originY: height - hexH * 4.5, cols: 5, rows: 5 },
      ];

      zones.forEach((zone) => {
        for (let row = 0; row < zone.rows; row++) {
          for (let col = 0; col < zone.cols; col++) {
            const cx = zone.originX + col * hexW * 0.75;
            const cy = zone.originY + row * hexH + (col % 2 === 0 ? 0 : hexH / 2);
            const distFromCorner = Math.sqrt(col * col + row * row);
            const alpha = Math.max(0, 0.05 - distFromCorner * 0.008);
            if (alpha > 0.003) drawHex(cx, cy, alpha);
          }
        }
      });

      ctx.restore();
    };

    // Slow-moving diagonal neon light beams sweeping across the scene -
    // premium SaaS-style lighting, very low opacity so it stays subtle.
    const drawLightBeams = (time) => {
      ctx.save();
      const beams = [
        { speed: 0.00009, widthPx: 220, color: "56, 189, 248", opacity: 0.05 },
        { speed: 0.00006, widthPx: 160, color: "168, 85, 247", opacity: 0.035 },
      ];

      beams.forEach((beam, i) => {
        const cycle = (time * beam.speed + i * 0.5) % 1.6 - 0.3;
        const beamX = cycle * (width + 400) - 200;

        const gradient = ctx.createLinearGradient(beamX - beam.widthPx, 0, beamX + beam.widthPx, height);
        gradient.addColorStop(0, `rgba(${beam.color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${beam.color}, ${beam.opacity})`);
        gradient.addColorStop(1, `rgba(${beam.color}, 0)`);

        ctx.save();
        ctx.translate(beamX, 0);
        ctx.rotate((18 * Math.PI) / 180);
        ctx.fillStyle = gradient;
        ctx.fillRect(-beam.widthPx, -200, beam.widthPx * 2, height + 400);
        ctx.restore();
      });

      ctx.restore();
    };

    // 1. API Gateway (top-left)
    const drawApiGateway = (cx, cy, size, opacity) => {
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`; // Cyan
      ctx.lineWidth = 1.2;

      // Draw overlapping squares representing portal entry
      for (let i = 0; i < 3; i++) {
        const offset = i * 4;
        ctx.strokeRect(cx - size / 2 + offset, cy - size / 2 + offset, size - 8, size - 8);
      }

      // Title tag drawn on canvas
      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 1.5})`;
      ctx.fillText("API_GW", cx - size / 2, cy - size / 2 - 8);

      // Dash containment line
      ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - size - 10, cy - size - 10, size * 2 + 20, size * 2 + 20);
      ctx.restore();
    };

    // 2. Load Balancer (center-top)
    const drawLoadBalancer = (cx, cy, size, opacity) => {
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`; // Cyan
      ctx.lineWidth = 1;

      // Center router node
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.stroke();

      // Horizontal text
      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 1.5})`;
      ctx.fillText("ALB", cx - 8, cy - 12);

      // Branching lines splitting requests downwards
      const branches = 3;
      for (let i = 0; i < branches; i++) {
        const angle = Math.PI / 4 + (i * Math.PI) / 4; // 45, 90, 135 degrees
        const endX = cx + Math.cos(angle) * size;
        const endY = cy + Math.sin(angle) * size * 0.75;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(endX, endY, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.2})`;
        ctx.fill();
      }
      ctx.restore();
    };

    // 3. Kubernetes Heptagon cluster (middle-left)
    const drawK8sCluster = (cx, cy, size, opacity, time) => {
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`; // Cyan
      ctx.lineWidth = 1;
      
      const sides = 7;
      const rotation = time * 0.0003;
      
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i * Math.PI * 2) / sides + rotation;
        const x = cx + Math.cos(angle) * size;
        const y = cy + Math.sin(angle) * size * 0.8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Hub spokes
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i * Math.PI * 2) / sides + rotation;
        const x = cx + Math.cos(angle) * size;
        const y = cy + Math.sin(angle) * size * 0.8;
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Inner smaller heptagon core
      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 1.4})`; // Azure
      ctx.beginPath();
      const innerSize = size * 0.42;
      for (let i = 0; i < sides; i++) {
        const angle = (i * Math.PI * 2) / sides + rotation;
        const x = cx + Math.cos(angle) * innerSize;
        const y = cy + Math.sin(angle) * innerSize * 0.8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Center hub
      ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 2.5})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // Text label
      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.5})`;
      ctx.fillText("K8S_CORE", cx - 22, cy - size - 8);

      // Dash boundaries
      ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - size - 15, cy - size - 10, size * 2 + 30, size * 2);
      ctx.restore();
    };

    // 4. VPN Secure lock node (top-right)
    const drawSecureLockNode = (cx, cy, size, opacity) => {
      ctx.save();
      ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`; // Purple highlight
      ctx.lineWidth = 1.0;

      // Lock body
      const w = size * 0.8;
      const h = size * 0.6;
      ctx.strokeRect(cx - w / 2, cy - h / 4, w, h);
      
      // Shackle loop
      ctx.beginPath();
      ctx.arc(cx, cy - h / 4, size * 0.28, Math.PI, 0);
      ctx.stroke();

      // Lock center hole
      ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 1.8})`;
      ctx.beginPath();
      ctx.arc(cx, cy + h / 4, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Title
      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 1.5})`;
      ctx.fillText("SEC_VPN", cx - size / 2, cy - size / 2 - 8);

      // Containment line
      ctx.strokeStyle = "rgba(168, 85, 247, 0.04)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - size - 15, cy - size - 10, size * 2 + 30, size * 2);
      ctx.restore();
    };

    // 5. Cloud S3 Storage (bottom-center)
    const drawCloudStorage = (cx, cy, size, opacity) => {
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`; // Cyan
      ctx.lineWidth = 1;

      // Flat cylinder (storage bucket base)
      const r = size;
      const h = size * 0.6;
      ctx.beginPath();
      ctx.ellipse(cx, cy + h, r, r * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx - r, cy + h);
      ctx.moveTo(cx + r, cy);
      ctx.lineTo(cx + r, cy + h);
      ctx.stroke();

      // Inside storage slot disk stack
      ctx.beginPath();
      ctx.ellipse(cx, cy + h * 0.5, r, r * 0.35, 0, 0, Math.PI);
      ctx.stroke();

      // Label S3
      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 1.5})`;
      ctx.fillText("S3_STOR", cx - 18, cy - 10);

      // Containment box
      ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - r - 15, cy - 18, r * 2 + 30, h + 30);
      ctx.restore();
    };

    // 6. Server Cabinet silhouette (middle-right)
    const drawServerCabinet = (cx, cy, w, h, opacity) => {
      ctx.save();
      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`; // Azure
      ctx.lineWidth = 1;
      
      // Cabinet frame
      ctx.strokeRect(cx, cy, w, h);

      // Label
      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.5})`;
      ctx.fillText("SRV_RACK", cx, cy - 8);

      // Containment grid
      ctx.strokeStyle = "rgba(96, 165, 250, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - 15, cy - 20, w + 30, h + 30);

      ctx.setLineDash([]);
      const shelfH = h / 3;
      for (let i = 0; i < 3; i++) {
        const sy = cy + i * shelfH;
        ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.8})`;
        ctx.strokeRect(cx + 4, sy + 4, w - 8, shelfH - 8);
        ctx.strokeRect(cx + 8, sy + 8, w - 28, shelfH - 16);

        // Blinking LEDs
        ctx.beginPath();
        ctx.arc(cx + w - 12, sy + shelfH / 2, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = blinkStates[i]
          ? `rgba(56, 189, 248, ${opacity * 2.2})` // Cyan
          : `rgba(30, 58, 138, ${opacity * 0.6})`;
        ctx.fill();

        if (blinkStates[i]) {
          ctx.save();
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 5;
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(cx + w - 12, sy + shelfH / 2, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.restore();
    };

    // 7. Database Cylinder (bottom-left)
    const drawDatabaseCylinder = (cx, cy, r, h, opacity, pulse) => {
      ctx.save();
      ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
      ctx.lineWidth = 1.0;

      ctx.beginPath();
      ctx.ellipse(cx, cy + h, r, r * 0.38, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.38, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx - r, cy + h);
      ctx.moveTo(cx + r, cy);
      ctx.lineTo(cx + r, cy + h);
      ctx.stroke();

      const disks = 3;
      for (let i = 1; i < disks; i++) {
        const dy = cy + (h * i) / disks;
        ctx.beginPath();
        ctx.ellipse(cx, dy, r, r * 0.38, 0, 0, Math.PI);
        ctx.stroke();
      }

      const pulseY = cy + h * pulse;
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 2.5})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(cx, pulseY, r, r * 0.38, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(14, 165, 233, ${opacity * 1.5})`;
      ctx.fillText("RDS_DB", cx - 16, cy - 10);

      ctx.strokeStyle = "rgba(14, 165, 233, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - r - 15, cy - 18, r * 2 + 30, h + 30);
      ctx.restore();
    };

    // 8. CI/CD Pipeline (bottom-right)
    const drawCicdPipeline = (cx, cy, size, opacity, time) => {
      ctx.save();
      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`; // Azure
      ctx.lineWidth = 1;

      const numStages = 3;
      const spacing = size * 0.8;
      const startX = cx - spacing;
      const labels = ["BLD", "TST", "DEP"];

      for (let i = 0; i < numStages; i++) {
        const sx = startX + i * spacing;
        
        ctx.beginPath();
        ctx.arc(sx, cy, 6, 0, Math.PI * 2);
        ctx.stroke();

        if (i < numStages - 1) {
          ctx.beginPath();
          ctx.moveTo(sx + 6, cy);
          ctx.lineTo(sx + spacing - 6, cy);
          ctx.stroke();
        }

        ctx.font = "7px monospace";
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.5})`;
        ctx.fillText(labels[i], sx - 7, cy - 10);
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.5})`;
      ctx.fillText("CI_CD", cx - 12, cy - 22);

      const loopDuration = 3200;
      const progress = (time % loopDuration) / loopDuration;
      const activeX = startX + progress * (spacing * 2);
      
      ctx.fillStyle = "#38bdf8"; // cyan pulse packet
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(activeX, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Containment box
      ctx.strokeStyle = "rgba(96, 165, 250, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - size - 15, cy - 32, size * 2 + 30, 50);
      ctx.restore();
    };

    // 9. Container Runtime - stacked minimal container icons (Docker-style)
    const drawContainerStack = (cx, cy, size, opacity, time) => {
      ctx.save();
      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`; // Azure
      ctx.lineWidth = 1;

      const boxW = size * 1.1;
      const boxH = size * 0.4;
      const gap = size * 0.14;
      const totalH = boxH * 3 + gap * 2;
      const startY = cy - totalH / 2;

      for (let i = 0; i < 3; i++) {
        const offsetX = (i - 1) * size * 0.12;
        const y = startY + i * (boxH + gap);
        const x = cx - boxW / 2 + offsetX;
        ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
        ctx.strokeRect(x, y, boxW, boxH);

        // Minimal corrugation lines
        ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.5})`;
        ctx.beginPath();
        for (let lx = 6; lx < boxW - 6; lx += 8) {
          ctx.moveTo(x + lx, y + 3);
          ctx.lineTo(x + lx, y + boxH - 3);
        }
        ctx.stroke();

        // Pulsing "running" status indicator
        const pulse = 0.5 + Math.sin(time * 0.003 + i) * 0.5;
        ctx.beginPath();
        ctx.arc(x + boxW - 6, y + boxH / 2, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${opacity * (1.2 + pulse)})`;
        ctx.fill();
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.5})`;
      ctx.fillText("CONTAINERS", cx - boxW / 2, startY - 8);

      ctx.strokeStyle = "rgba(96, 165, 250, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - boxW / 2 - 10, startY - 20, boxW + 20, totalH + 30);
      ctx.restore();
    };

    // 10. Monitoring Dashboard - minimal screen with live metric bars
    const drawMonitorDashboard = (cx, cy, size, opacity, time) => {
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`; // Cyan
      ctx.lineWidth = 1;

      const w = size * 1.3;
      const h = size * 0.9;

      // Screen frame + stand
      ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
      ctx.beginPath();
      ctx.moveTo(cx, cy + h / 2);
      ctx.lineTo(cx, cy + h / 2 + 6);
      ctx.moveTo(cx - 8, cy + h / 2 + 6);
      ctx.lineTo(cx + 8, cy + h / 2 + 6);
      ctx.stroke();

      // Animated bar chart inside the screen
      const bars = 5;
      const padding = 6;
      const barAreaW = w - padding * 2;
      const barW = barAreaW / bars - 3;
      for (let i = 0; i < bars; i++) {
        const bx = cx - w / 2 + padding + i * (barW + 3);
        const wave = 0.4 + Math.sin(time * 0.0015 + i * 0.8) * 0.35 + 0.35;
        const barH = (h - padding * 2) * Math.max(0.12, Math.min(1, wave));
        ctx.strokeStyle = i === bars - 1
          ? `rgba(168, 85, 247, ${opacity * 1.8})` // Purple highlight on latest metric
          : `rgba(56, 189, 248, ${opacity * 1.3})`;
        ctx.strokeRect(bx, cy + h / 2 - padding - barH, barW, barH);
      }

      ctx.font = "8px monospace";
      ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 1.5})`;
      ctx.fillText("MONITOR", cx - w / 2, cy - h / 2 - 8);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - w / 2 - 12, cy - h / 2 - 18, w + 24, h + 40);
      ctx.restore();
    };

    // Guided deployment-workflow comet: travels stage-to-stage across the
    // infrastructure, leaving a fading glow trail and a small text label
    // that names the current pipeline step (e.g. "Kubernetes · Schedule Pods").
    const drawWorkflowComet = (fromPos, toPos, ease, toStage, time) => {
      const cx = fromPos.x + (toPos.x - fromPos.x) * ease;
      const cy = fromPos.y + (toPos.y - fromPos.y) * ease;
      const [r, g, b] = toStage.color.split(",").map((v) => v.trim());

      ctx.save();

      // Fading trail back toward the origin stage
      const trailSteps = 10;
      for (let i = 0; i < trailSteps; i++) {
        const t = Math.max(0, ease - (i / trailSteps) * 0.35);
        const tx = fromPos.x + (toPos.x - fromPos.x) * t;
        const ty = fromPos.y + (toPos.y - fromPos.y) * t;
        const trailAlpha = (1 - i / trailSteps) * 0.35;
        ctx.beginPath();
        ctx.arc(tx, ty, 2.2 * (1 - i / trailSteps), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailAlpha})`;
        ctx.fill();
      }

      // Comet head with soft glow
      const headPulse = 1 + Math.sin(time * 0.01) * 0.25;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * headPulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(cx, cy, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();

      // Stage label fades in as the comet nears its destination
      const labelOpacity = Math.min(0.85, Math.max(0, (ease - 0.55) / 0.45) * 0.85);
      if (labelOpacity > 0.02) {
        ctx.font = "9px monospace";
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${labelOpacity})`;
        ctx.textAlign = "center";
        ctx.fillText(toStage.label, toPos.x, toPos.y + 46);
        ctx.textAlign = "left";
      }

      ctx.restore();
    };

    const drawVectorCloudSymbol = (cx, cy, scale, opacity) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.moveTo(170, 80);
      ctx.bezierCurveTo(200, 80, 220, 50, 190, 20);
      ctx.bezierCurveTo(190, 0, 150, 0, 140, 10);
      ctx.bezierCurveTo(130, -10, 90, -10, 80, 10);
      ctx.bezierCurveTo(50, 10, 50, 40, 70, 50);
      ctx.bezierCurveTo(40, 50, 40, 80, 70, 80);
      ctx.closePath();
      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    };

    const drawDigitalWaves = (time) => {
      ctx.save();
      ctx.setLineDash([6, 12]);
      ctx.lineWidth = 0.8;

      const drawWave = (amplitude, freq, speed, yPos, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 15) {
          const y = yPos + Math.sin(x * freq + time * speed) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      // Wave 1
      drawWave(20, 0.0018, 0.012, height * 0.89, "rgba(30, 58, 138, 0.12)");
      // Wave 2
      drawWave(15, 0.0028, 0.016, height * 0.91, "rgba(56, 189, 248, 0.08)");

      ctx.restore();
    };

    // Render loop
    let lastTime = 0;
    const draw = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Update LED blink states every 850ms
      if (timestamp - lastBlinkTime > 850) {
        blinkStates = blinkStates.map(() => Math.random() > 0.5);
        lastBlinkTime = timestamp;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Calculate smooth eased mouse parallax offsets
      const targetPX = (mouseX - window.innerWidth / 2) * 0.05;
      const targetPY = (mouseY - window.innerHeight / 2) * 0.05;
      // Interpolate with simple easing factor 0.06
      parallaxX += (targetPX - parallaxX) * 0.06;
      parallaxY += (targetPY - parallaxY) * 0.06;

      // Coordinate presets for architecture symbols
      const apiGwPos = { x: width * 0.13, y: height * 0.18 };
      const vpnLockPos = { x: width * 0.86, y: height * 0.18 };
      const albPos = { x: width * 0.5, y: height * 0.14 };
      const k8sPos = { x: width * 0.13, y: height * 0.46 };
      const rackPos = { x: width * 0.87, y: height * 0.45 };
      const dbPos = { x: width * 0.13, y: height * 0.74 };
      const cicdPos = { x: width * 0.86, y: height * 0.78 };
      const s3Pos = { x: width * 0.5, y: height * 0.82 };
      const containersPos = { x: width * 0.24, y: height * 0.30 };
      const monitorPos = { x: width * 0.76, y: height * 0.64 };

      const workflowPositions = {
        cicd: cicdPos,
        containers: containersPos,
        k8s: k8sPos,
        alb: albPos,
        apiGw: apiGwPos,
        db: dbPos,
        s3: s3Pos,
        monitor: monitorPos,
        vpn: vpnLockPos,
      };

      // Advance the guided deployment-workflow comet along its stage sequence
      const wfHopDuration = 1600; // ms spent traveling between two stages
      workflowProgress += deltaTime / wfHopDuration;
      if (workflowProgress >= 1) {
        workflowProgress = 0;
        workflowArrivals[workflowStages[workflowIndex].key] = timestamp;
        workflowIndex = (workflowIndex + 1) % workflowStages.length;
      }

      const wfFromStage = workflowStages[workflowIndex];
      const wfToStage = workflowStages[(workflowIndex + 1) % workflowStages.length];
      const wfFromPos = workflowPositions[wfFromStage.key];
      const wfToPos = workflowPositions[wfToStage.key];
      const wfEase = workflowProgress < 0.5
        ? 2 * workflowProgress * workflowProgress
        : 1 - Math.pow(-2 * workflowProgress + 2, 2) / 2;
      const wfX = wfFromPos.x + (wfToPos.x - wfFromPos.x) * wfEase;
      const wfY = wfFromPos.y + (wfToPos.y - wfFromPos.y) * wfEase;

      // Briefly boosts an icon's opacity right after the comet arrives at it
      const wfArrivalGlow = (key, baseOpacity) => {
        const arrivedAt = workflowArrivals[key];
        if (!arrivedAt) return baseOpacity;
        const age = timestamp - arrivedAt;
        if (age > 900) return baseOpacity;
        return baseOpacity + (1 - age / 900) * 0.4;
      };

      // --- LAYER 1: Dotted Grid (Slowest Parallax, 30% speed) ---
      ctx.save();
      ctx.translate(parallaxX * 0.3, parallaxY * 0.3);
      drawGeometricGrid();
      drawHexGrid(timestamp);
      drawLightBeams(timestamp);
      ctx.restore();

      // --- LAYER 2: Topology Network, binary particles, waves (Midground Parallax, 60% speed) ---
      ctx.save();
      ctx.translate(parallaxX * 0.6, parallaxY * 0.6);

      // Draw digital waves at bottom
      drawDigitalWaves(timestamp * 0.05);

      // Render drifting clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.vx;
        if (cloud.x > width + 250) {
          cloud.x = -250;
        }
        drawVectorCloudSymbol(cloud.x, cloud.y, cloud.scale, cloud.opacity);
      });

      // Update and render binary columns
      ctx.font = "9px monospace";
      binaryParticles.forEach((bp) => {
        bp.y += bp.vy;
        if (bp.y < -20) {
          bp.y = height + Math.random() * 50;
          bp.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(96, 165, 250, ${bp.opacity})`; // Azure
        ctx.fillText(bp.value, bp.x, bp.y);
      });

      // Update node velocities
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.baseX !== null) {
          const dx = n.x - n.baseX;
          const dy = n.y - n.baseY;
          if (Math.abs(dx) > wanderRadius) {
            n.vx = -n.vx;
            n.x = n.baseX + Math.sign(dx) * wanderRadius;
          }
          if (Math.abs(dy) > wanderRadius) {
            n.vy = -n.vy;
            n.y = n.baseY + Math.sign(dy) * wanderRadius;
          }
        } else {
          if (n.x < 0 || n.x > width) n.vx = -n.vx;
          if (n.y < 0 || n.y > height) n.vy = -n.vy;
        }

        const scalePulse = 1.0 + Math.sin(timestamp * 0.0008 + n.pulseOffset) * 0.2;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * scalePulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.2)"; // Cyan
        ctx.fill();
      });

      // Draw connection lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1.0 - dist / connectionDist) * 0.10;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`; // Azure lines
            
            // Check if one of the endpoints is connected to the secure VPN lock
            const secureLink = (
              Math.sqrt(Math.pow(nodes[i].x - vpnLockPos.x, 2) + Math.pow(nodes[i].y - vpnLockPos.y, 2)) < 160 ||
              Math.sqrt(Math.pow(nodes[j].x - vpnLockPos.x, 2) + Math.pow(nodes[j].y - vpnLockPos.y, 2)) < 160
            );

            if (secureLink) {
              // Draw a secure double connection line
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 1.5})`; // Purple secure line
              ctx.beginPath();
              ctx.moveTo(nodes[i].x - 1, nodes[i].y - 1);
              ctx.lineTo(nodes[j].x - 1, nodes[j].y - 1);
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(nodes[i].x + 1, nodes[i].y + 1);
              ctx.lineTo(nodes[j].x + 1, nodes[j].y + 1);
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw connections linking topology nodes to local DevOps assets
        const gwDx = nodes[i].x - apiGwPos.x;
        const gwDy = nodes[i].y - apiGwPos.y;
        const gwDist = Math.sqrt(gwDx * gwDx + gwDy * gwDy);
        if (gwDist < 160) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1.0 - gwDist / 160) * 0.05})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(apiGwPos.x, apiGwPos.y); ctx.stroke();
        }

        const vpnDx = nodes[i].x - vpnLockPos.x;
        const vpnDy = nodes[i].y - vpnLockPos.y;
        const vpnDist = Math.sqrt(vpnDx * vpnDx + vpnDy * vpnDy);
        if (vpnDist < 160) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${(1.0 - vpnDist / 160) * 0.06})`; // Secure VPN lines
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(vpnLockPos.x, vpnLockPos.y); ctx.stroke();
        }

        const albDx = nodes[i].x - albPos.x;
        const albDy = nodes[i].y - albPos.y;
        const albDist = Math.sqrt(albDx * albDx + albDy * albDy);
        if (albDist < 180) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1.0 - albDist / 180) * 0.05})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(albPos.x, albPos.y); ctx.stroke();
        }

        const k8sDx = nodes[i].x - k8sPos.x;
        const k8sDy = nodes[i].y - k8sPos.y;
        const k8sDist = Math.sqrt(k8sDx * k8sDx + k8sDy * k8sDy);
        if (k8sDist < 160) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1.0 - k8sDist / 160) * 0.04})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(k8sPos.x, k8sPos.y); ctx.stroke();
        }

        const rackDx = nodes[i].x - rackPos.x;
        const rackDy = nodes[i].y - rackPos.y;
        const rackDist = Math.sqrt(rackDx * rackDx + rackDy * rackDy);
        if (rackDist < 180) {
          ctx.strokeStyle = `rgba(96, 165, 250, ${(1.0 - rackDist / 180) * 0.04})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(rackPos.x, rackPos.y); ctx.stroke();
        }

        const dbDx = nodes[i].x - dbPos.x;
        const dbDy = nodes[i].y - dbPos.y;
        const dbDist = Math.sqrt(dbDx * dbDx + dbDy * dbDy);
        if (dbDist < 160) {
          ctx.strokeStyle = `rgba(14, 165, 233, ${(1.0 - dbDist / 160) * 0.06})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(dbPos.x, dbPos.y); ctx.stroke();
        }

        const cicdDx = nodes[i].x - cicdPos.x;
        const cicdDy = nodes[i].y - cicdPos.y;
        const cicdDist = Math.sqrt(cicdDx * cicdDx + cicdDy * cicdDy);
        if (cicdDist < 160) {
          ctx.strokeStyle = `rgba(96, 165, 250, ${(1.0 - cicdDist / 160) * 0.04})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(cicdPos.x, cicdPos.y); ctx.stroke();
        }

        const s3Dx = nodes[i].x - s3Pos.x;
        const s3Dy = nodes[i].y - s3Pos.y;
        const s3Dist = Math.sqrt(s3Dx * s3Dx + s3Dy * s3Dy);
        if (s3Dist < 180) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1.0 - s3Dist / 180) * 0.05})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(s3Pos.x, s3Pos.y); ctx.stroke();
        }

        const ctrDx = nodes[i].x - containersPos.x;
        const ctrDy = nodes[i].y - containersPos.y;
        const ctrDist = Math.sqrt(ctrDx * ctrDx + ctrDy * ctrDy);
        if (ctrDist < 160) {
          ctx.strokeStyle = `rgba(96, 165, 250, ${(1.0 - ctrDist / 160) * 0.05})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(containersPos.x, containersPos.y); ctx.stroke();
        }

        const monDx = nodes[i].x - monitorPos.x;
        const monDy = nodes[i].y - monitorPos.y;
        const monDist = Math.sqrt(monDx * monDx + monDy * monDy);
        if (monDist < 160) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1.0 - monDist / 160) * 0.05})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(monitorPos.x, monitorPos.y); ctx.stroke();
        }
      }

      // Spawn data flow packets
      if (packets.length < 10 && Math.random() < 0.08 && nodes.length > 0) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        const fromNode = nodes[fromIdx];
        
        const candidates = [];
        for (let j = 0; j < nodes.length; j++) {
          if (fromIdx === j) continue;
          const dx = fromNode.x - nodes[j].x;
          const dy = fromNode.y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            candidates.push(nodes[j]);
          }
        }

        if (candidates.length > 0) {
          const toNode = candidates[Math.floor(Math.random() * candidates.length)];
          packets.push({
            from: fromNode,
            to: toNode,
            progress: 0,
            speed: Math.random() * 0.012 + 0.006,
            color: Math.random() > 0.6 ? "#a855f7" : (Math.random() > 0.5 ? "#38bdf8" : "#60a5fa"), // Purple, Cyan, or Azure
            size: Math.random() * 1.2 + 1.0,
          });
        }
      }

      // Draw data packets
      packets.forEach((p, index) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(index, 1);
          return;
        }

        const px = p.from.x + (p.to.x - p.from.x) * p.progress;
        const py = p.from.y + (p.to.y - p.from.y) * p.progress;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.restore(); // Restore LAYER 2 translation

      // --- LAYER 3: DevOps Architecture Vector Drawings (Foreground Parallax, 90% speed) ---
      ctx.save();
      ctx.translate(parallaxX * 0.9, parallaxY * 0.9);

      // Render vector items - each brightens briefly when the workflow comet arrives
      cylinderPulse = (cylinderPulse + 0.004) % 1.0;
      drawApiGateway(apiGwPos.x, apiGwPos.y, 30, wfArrivalGlow("apiGw", 0.15));
      drawSecureLockNode(vpnLockPos.x, vpnLockPos.y, 25, wfArrivalGlow("vpn", 0.15));
      drawLoadBalancer(albPos.x, albPos.y, 35, wfArrivalGlow("alb", 0.16));
      drawK8sCluster(k8sPos.x, k8sPos.y, 35, wfArrivalGlow("k8s", 0.13), timestamp);
      drawServerCabinet(rackPos.x, rackPos.y, 55, 95, 0.12);
      drawDatabaseCylinder(dbPos.x, dbPos.y, 26, 60, wfArrivalGlow("db", 0.14), cylinderPulse);
      drawCicdPipeline(cicdPos.x, cicdPos.y, 35, wfArrivalGlow("cicd", 0.14), timestamp);
      drawCloudStorage(s3Pos.x, s3Pos.y, 26, wfArrivalGlow("s3", 0.14));
      drawContainerStack(containersPos.x, containersPos.y, 28, wfArrivalGlow("containers", 0.13), timestamp);
      drawMonitorDashboard(monitorPos.x, monitorPos.y, 30, wfArrivalGlow("monitor", 0.14), timestamp);

      // Draw the guided workflow comet + its fading trail and stage label
      drawWorkflowComet(wfFromPos, wfToPos, wfEase, wfToStage, timestamp);

      ctx.restore(); // Restore LAYER 3 translation

      animationFrameId = requestAnimationFrame(draw);
    };

    // Attach mouse tracking listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-cloud-bg" aria-hidden="true">
      {/* High Performance Canvas for Network Topology, digital waves, and abstract wireframes */}
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

      {/* Floating Glassmorphism Panels (visible on large screen resolutions to maintain generous text spaces) */}
      
      {/* Panel 1: Top Right Cluster Monitor */}
      <div 
        className="glass-panel animate-float-slow fixed p-5 w-72 z-10 hidden xl:block"
        style={{ right: "4%", top: "15%" }}
      >
        <div className="flex items-center gap-2 mb-3.5 border-b border-sky-500/10 pb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="text-[10px] tracking-wider text-sky-400 font-bold uppercase font-mono">aws-cluster-monitor</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Uptime</span>
            <span className="text-sky-300 font-semibold">{metrics.uptime}%</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Avg Latency</span>
            <span className="text-sky-300 font-semibold">{metrics.latency} ms</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Rate</span>
            <span className="text-sky-300 font-semibold">{metrics.reqRate}/s</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">CPU Load</span>
            <span className="text-sky-300 font-semibold">{metrics.cpuLoad}%</span>
          </div>
        </div>

        {/* Live Sparkline Graph */}
        <div className="mt-4 pt-3 border-t border-sky-500/10">
          <span className="text-slate-500 text-[10px] block uppercase font-mono mb-2">Request Load Sparkline</span>
          <div className="h-10 w-full flex items-end justify-between px-1">
            {sparklineData.map((val, idx) => (
              <div 
                key={idx}
                className="w-[18px] bg-gradient-to-t from-blue-600/30 to-sky-400/80 rounded-t-sm transition-all duration-300"
                style={{ height: `${val}%`, minHeight: '3px' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Panel 2: Bottom Left DevOps Terminal Stream */}
      <div 
        className="glass-panel animate-float-delayed fixed p-4.5 w-80 z-10 hidden 2xl:block"
        style={{ left: "4%", bottom: "4%" }}
      >
        <div className="flex items-center justify-between mb-3 border-b border-sky-500/10 pb-2">
          <div className="flex items-center gap-2">
            <i className="fas fa-terminal text-sky-400 text-[11px]" />
            <span className="text-[10px] tracking-wider text-sky-400 font-bold uppercase font-mono">devops-pipeline</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 font-mono border border-sky-800/30">v1.2.8</span>
        </div>

        {/* Logs terminal feed */}
        <div className="space-y-1.5 font-mono text-[10px] text-slate-400 overflow-hidden leading-relaxed">
          {logs.map((log, index) => {
            const isOk = log.includes("[ok]");
            return (
              <div key={index} className="truncate select-none">
                {isOk ? (
                  <span className="text-emerald-400 font-semibold">[ok]</span>
                ) : (
                  <span className="text-sky-500">[info]</span>
                )}
                {log.substring(6)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
