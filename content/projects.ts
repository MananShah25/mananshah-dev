import type { OpenSourceContribution, Project } from "@/lib/types";

// Every fact and number here comes from the project's repo README, the paper, or the PR itself.
// Never add a metric that isn't published there.
// Featured projects (with `caseStudy`) get a page at /projects/<slug>, in this order.
export const projects: Project[] = [
  {
    slug: "adas-validation-harness",
    title: "ADAS Validation Harness",
    kind: "Personal project",
    tagline:
      "A validation framework for Adaptive Cruise Control, Lane Keeping Assist and Automatic Emergency Braking: simulation and real-vehicle data scored by one shared schema.",
    highlights: ["143 pytest + 32 GoogleTest tests", "29 scripted scenarios", "C++17 core, bit-exact parity"],
    tags: ["Python", "C++17", "pybind11", "highway-env", "YOLOv8n", "OBD-II", "pytest", "GoogleTest"],
    links: { github: "https://github.com/MananShah25/adas-validation-harness" },
    caseStudy: {
      problem:
        "Validating driver-assist features means scoring very different data sources, physics simulation and real OBD-II and dashcam data, against the same written acceptance criteria, so that a threshold means the same thing no matter where the numbers came from.",
      approach: [
        "Two tracks feed one shared core: a highway-env simulation track and an ingestion → vision → fusion backbone for real-vehicle data. Both write the same test-procedure schema and defect-log format, and a convergence test asserts the outputs are identical by type.",
        "Rule-based ACC, LKA and AEB controllers are the system under test, driven through scripted lead-vehicle scenarios (steady, decelerating, stop-and-go, cut-in) so the regression suite never drifts.",
        "Pass thresholds are sourced from NHTSA criteria (AEB warning at 2.0 s TTC, braking at 1.8 s); the 0.3 m lane-deviation limit is explicitly labeled as a conservative proxy.",
        "The real-data path replays a 60,440-row public OBD-II dataset from 14 drivers, handling roughly 80% missing RPM/throttle values and no brake signal, and fuses OBD speed with YOLOv8n monocular distance into time-to-collision.",
        "The per-timestep control loop is reimplemented in C++17 and driven from the same Python scenarios via pybind11, with bit-exact parity against the Python reference.",
      ],
      results: {
        rows: [
          { metric: "ACC scenarios passing", value: "6 / 10" },
          { metric: "LKA scenarios passing", value: "8 / 10" },
          { metric: "AEB scenarios passing", value: "8 / 9" },
          { metric: "Automated tests", value: "143 Python + 32 GoogleTest" },
        ],
        note: "The failures are intentional findings, not bugs in the harness: each was verified against raw trajectory data, and a 100% pass rate would have meant the scenarios weren't testing anything.",
      },
      limitations: [
        "No run is labeled real-world yet: that requires a live OBD-II drive paired with footage from the same drive.",
        "The controllers are deliberately simple baselines; the harness exists to catch where they fall short.",
        "The end-to-end vision run uses a synthesized clip, which validates the pipeline wiring but supports no detection-accuracy claim.",
      ],
    },
  },
  {
    slug: "lidnerf",
    title: "LIDNeRF",
    kind: "Research · Peer-reviewed publication",
    tagline:
      "Language-guided editing of 3D NeRF scenes: describe an edit in words and it is optimized into the whole scene.",
    highlights: ["Peer-reviewed journal paper", "IJIIT · Vol. 22", "Open access"],
    tags: ["NeRF", "PyTorch", "InstructDiffusion", "Lang-SAM", "CLIP", "OpenCV"],
    links: { paper: "https://www.igi-global.com/article/lidnerf/369336" },
    caseStudy: {
      credits:
        "Vaishali Kulkarni, Khushal Hemant Sharma, Manan Shah, Aniruddh Vinay Kulkarni · International Journal of Intelligent Information Technologies (IJIIT), Vol. 22 · DOI 10.4018/IJIIT.369336",
      problem:
        "Neural radiance fields (NeRF) reconstruct high-fidelity 3D scenes from sparse 2D images, but editing those scenes, such as adding, removing, or replacing an object, remains a significant challenge.",
      approach: [
        "InstructDiffusion generates the requested edit on a rendered view from a plain-language instruction.",
        "Lang-SAM builds a precise mask from the text description, confining the edit to the target region and cleaning up the noisy diffusion output.",
        "An iterative dataset update renders views from the NeRF, edits them with the diffusion model, and uses the edited views to supervise reconstruction, so the edit lands in the 3D scene rather than a single image.",
      ],
      myRole:
        "As research assistant, I engineered the multi-stage NeRF editor in PyTorch and CLIP, optimized multi-view consistency using OpenCV, and set up reproducible research workflows that led to the co-authored publication.",
      results: {
        note: "The paper evaluates the method qualitatively, showing targeted, localized edits including object addition, removal, and replacement. It does not report quantitative benchmarks.",
      },
    },
  },
  {
    slug: "cutoff",
    title: "Cutoff",
    kind: "Personal project · In progress",
    tagline:
      "A CPU regression engine for RISC-V that estimates when more random testing is unlikely to find a new bug, and stops itself.",
    highlights: ["12,839 programs/s on 8 workers", "201-bug fire drill self-test", "Byte-identical results on resume"],
    tags: ["C++20", "Verilator", "RISC-V RV32I", "PicoRV32", "CMake", "GoogleTest", "Good-Turing estimation"],
    links: { github: "https://github.com/MananShah25/Cutoff" },
    caseStudy: {
      problem:
        "Random-instruction regressions on a CPU usually run until someone decides they have run long enough. That decision is a guess, while simulation time is a real cost. Software fuzzing has statistical estimators for exactly this question; Cutoff applies them to CPU verification.",
      approach: [
        "Generates seeded, reproducible random RV32I programs from four generator profiles (G0 to G3).",
        "Runs each program on the Verilated PicoRV32 core and on a reference model in parallel worker processes, with three checker levels: final state, ordered store trace, and RVFI retirement events.",
        "Tracks which behaviours the programs have exercised and uses Good-Turing estimation to gauge how likely the next program is to exercise something new; a stop rule ends the run once that risk stays below a threshold.",
        "A fire drill plants 201 bugs (mutants) in an instrumented copy of the core and measures how many a campaign finds, and how many it had found when the stop rule would have fired.",
        "Results are deterministic: worker results are re-ordered by program id, runs can be interrupted and resumed exactly, and any failing program can be replayed.",
      ],
      results: {
        rows: [
          { metric: "Throughput, 8 workers (without / with behaviour tracking)", value: "22,220 / 12,839 programs/s" },
          { metric: "Stop rule at ε = 0.001, original core", value: "Stopped at 74,000 programs" },
          { metric: "Drill scan: 201 mutants × 500 programs", value: "164 killed · 37 survived" },
          { metric: "200,000-program run killed (SIGINT/SIGKILL) and resumed", value: "Byte-identical results" },
        ],
        note: "Measured on an Apple M3 with 8 threads. The stop rule fired at the same point for 1 and 8 workers, and every killed mutant failed within its first 10 programs. Zero failures on the original core says nothing about bugs uniform random programs rarely reach: two surviving mutants survive only because the uniform generator never produces a backward jump.",
      },
      limitations: [
        "Work in progress: 8 of 12 build steps are done. Final report formats, the calibration benchmark and release hardening (shrinker, Docker image, user guide) are still to come.",
        "The stop rule's defaults are placeholders until the calibration benchmark exists, so no claim about compute saved is made yet.",
        "The estimators come from software-fuzzing research; no claim of novelty is made.",
      ],
    },
  },
  {
    slug: "inspection-station",
    title: "Automated Inspection & Reject Station",
    kind: "Personal project",
    tagline:
      "A simulated PLC inspection station verified like a safety-critical system: a spec-derived test plan, one Python harness for a simulation model and the live PLC runtime, and SQLite traceability.",
    highlights: ["24-scenario test plan, 24/24 on the model", "6 integration defects root-caused", "Live-validated over Modbus TCP"],
    tags: ["OpenPLC", "IEC 61131-3 Ladder Logic", "Python", "Pymodbus", "Modbus TCP", "pytest", "SQLite", "Docker"],
    // No public repo yet: add `github` here once it's pushed
    links: {},
    caseStudy: {
      problem:
        "A controller that decides whether each unit passes or gets pushed into a reject bin has to fail safe: a lost E-stop signal, an open guard, or a pusher that never confirms its stroke must stop motion and latch a fault. The goal was to verify that behavior against a written spec and keep evidence that can be audited.",
      approach: [
        "Spec first: the state machine, I/O map and a rung-by-rung ladder specification were written before any test code, and they serve as the test oracle.",
        "A seven-state controller with 19 field I/O points (12 inputs, 7 outputs), written in IEC 61131-3 ladder logic and running on the OpenPLC Runtime in Docker.",
        "Fail-safe design: healthy-high E-stop and guard inputs, latched fault codes, a rising-edge reset that only clears when every safety condition is healthy, an extend/retract interlock, and pusher motion confirmed by end-of-stroke sensors within 1,500 ms timeouts.",
        "A 24-scenario test plan in five categories (happy path, safety, fault handling, timing and traceability), each scenario executable as a Python test case.",
        "One harness, two fidelity levels: scenarios use named signals only, and a backend switch runs the same suite against an in-memory Python model or the live PLC runtime over Modbus TCP.",
        "Each completed test cycle is logged to SQLite with serial, result, failure reason and cycle time, with SQL reports for yield, ranked reject reasons, mean and p95 cycle time, and throughput.",
      ],
      results: {
        rows: [
          { metric: "Scenario suite on the in-memory model", value: "24 / 24 pass" },
          { metric: "Integration defects root-caused and fixed", value: "6" },
          { metric: "Live runtime over Modbus TCP", value: "Representative subset" },
          { metric: "Live traceability records", value: "PASS 833 ms · FAIL 753 ms" },
        ],
        note: "The live subset covered the ready state, a pass cycle, a reject cycle, E-stop, guard, both pusher timeouts, unstable vision, counters and SQLite records. Defects included scan-order bugs in state transitions, competing rungs driving the conveyor, and a fault timer bound to the wrong generated instance.",
      },
      limitations: [
        "Simulation only: every sensor, the vision result and the safety inputs are simulated signals, with no physical PLC, sensors or pneumatics. This is simulation-based testing with live-runtime validation, not hardware-in-the-loop.",
        "All 24 scenarios have run on the model; only a representative subset has run against the live runtime so far.",
        "Fault 160 (extend and retract commanded together) has no scenario yet.",
        "Cycle time is measured on the host, because the PLC's cycle-time register is not yet populated.",
      ],
    },
  },
  {
    slug: "neural-compression-pipeline",
    title: "2-Stage Neural Compression Pipeline",
    kind: "Team project",
    tagline:
      "Two FastAPI microservices: a noise-robust CNN reads handwritten digits, then a from-scratch adaptive Huffman coder compresses the result.",
    highlights: ["99.2–99.4% OCR accuracy", "9.2 ms p50 end-to-end", "~468K-parameter CNN"],
    tags: ["PyTorch", "FastAPI", "Docker", "CNN", "FGK Adaptive Huffman", "pytest"],
    links: { github: "https://github.com/SanikaMarathe/2-Stage-Neural-Compression-Pipeline" },
    caseStudy: {
      problem:
        "Turn an image of handwritten digits into a compressed payload through two independent services, with OCR that holds up on noisy input and compression that needs no separately transmitted code table.",
      approach: [
        "The OCR service segments digits with Otsu thresholding and connected components, then classifies each with a VGG-style CNN (~468K parameters) trained on MNIST.",
        "Training augments data on the fly with clean, Gaussian (σ = 0.3) and 5% salt-and-pepper noise profiles, so the model learns noise-invariant features without a separate denoising step.",
        "The Huffman service implements FGK adaptive Huffman coding in pure Python: a single pass, with encoder and decoder trees kept in sync so no tree is transmitted.",
        "Both services run under Docker Compose, with benchmark scripts for accuracy, latency and compression quality.",
      ],
      results: {
        rows: [
          { metric: "OCR accuracy, clean", value: "99.4%" },
          { metric: "OCR accuracy, Gaussian noise (σ = 0.3)", value: "99.2%" },
          { metric: "OCR accuracy, salt & pepper (5%)", value: "99.2%" },
          { metric: "Full pipeline latency (p50 / p95 / p99)", value: "9.2 / 11.7 / 39.8 ms" },
          { metric: "Encoding efficiency, 99-character input", value: "0.91" },
        ],
        note: "Measured locally on an Apple M3 (MPS), 100 requests for latency.",
      },
      limitations: [
        "Short inputs expand rather than compress (ratio 1.40 at 5 characters) because adaptive Huffman pays a startup cost while its tree is sparse.",
        "The classifier is trained on MNIST digits only.",
      ],
    },
  },
  {
    slug: "chefpal",
    title: "ChefPal",
    kind: "Team project",
    tagline:
      "A multi-agent AI cooking companion: personalized recipes from your ingredients, allergy and diet filtering, and a real-time voice assistant.",
    highlights: ["Multi-agent LLM pipeline", "Allergy & diet filtering", "Live voice cooking assistant"],
    tags: ["GPT-4o-mini", "LangChain", "Streamlit", "React", "Matplotlib"],
    links: { github: "https://github.com/krishhhr/Code-Blooded" },
    caseStudy: {
      credits: "Built with Arti Panchal and Krish Ranawat",
      problem:
        "Recipe suggestions usually ignore what is actually in your kitchen, your allergies, and your diet, and they stop helping once you start cooking.",
      approach: [
        "An ingredient-parsing agent extracts nutritional data and tags from raw ingredients.",
        "Recipes are filtered automatically against allergies and dietary restrictions, then tailored to taste preferences.",
        "A step-by-step cooking assistant with a real-time voice interface (React) gives hands-free guidance.",
        "Nutritional breakdowns are visualized with Matplotlib, all orchestrated with GPT-4o-mini through LangChain in a Streamlit app.",
      ],
    },
  },
  {
    slug: "text-to-image",
    title: "Text-to-Image Synthesis",
    kind: "Team project",
    tagline:
      "Generating bird images from text captions on CUB-200-2011 with a two-stage StackGAN (64×64 refined to 256×256) and GAN-INT-CLS, trained on IU's Big Red GPUs.",
    highlights: [],
    tags: ["StackGAN", "GAN-INT-CLS", "CUB-200-2011"],
    links: { github: "https://github.com/Vraj24/Text-to-Image" },
  },
  {
    slug: "gnvs-alumni-app",
    title: "GNVS Alumni App",
    kind: "Internship project",
    tagline:
      "An alumni and career-networking Android app (beta), built during my software developer internship at GNVS Institute.",
    highlights: [],
    tags: ["Android", "Firebase"],
    links: { github: "https://github.com/khushalrs/GNVS-AlumniApp-Beta" },
  },
];

// Update `status` if the PR gets merged or closed.
export const openSource: OpenSourceContribution[] = [
  {
    project: "Composio",
    repo: "ComposioHQ/composio",
    title: "fix(cli): normalize doubled-prefix tool slugs in permission overrides",
    url: "https://github.com/ComposioHQ/composio/pull/4636",
    number: 4636,
    status: "Open · under review",
    summary:
      "The Composio CLI prompted for permission on every call for some tools, because the server returned saved policies under stale doubled-prefix slugs (OUTLOOK_OUTLOOK_SEARCH_MESSAGES instead of OUTLOOK_SEARCH_MESSAGES). I traced the same pattern across 107 slugs in about 40 toolkits and added a general normalizer for both fresh and cached permission snapshots, where an existing canonical key always wins.",
    details: ["Fixes issue #4327", "5 new tests, 16/16 passing", "+205 / −2 lines"],
    tags: ["TypeScript", "CLI", "Testing"],
  },
];
