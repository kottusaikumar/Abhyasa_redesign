// Canonical project copy. Regenerate the two static category pages with:
// node scripts/generate-project-pages.cjs
const projectCategories = {
  "physical-design": {
    "title": "Physical Design",
    "pageTitle": "VLSI Physical Design Projects – Learn STA, PnR & Layout with Cadence Tools",
    "metaDescription": "Gain practical experience with physical design projects covering clock tree synthesis, place & route, STA, and signoff using industry-standard EDA tools. Built for hands-on VLSI training across South India.",
    "crumb": "Physical Design Projects",
    "description": "Gain practical experience with physical design projects covering clock tree synthesis, place & route, STA, and signoff using industry-standard EDA tools. Built for hands-on VLSI training across South India.",
    "flowTitle": "Typical Physical Design Flow",
    "flow": [
      "Floorplanning",
      "Placement",
      "Routing",
      "Signoff"
    ],
    "topics": [
      [
        "Dynamic Power Reduction Techniques through Clock Tree Optimization",
        "This project involves optimizing the clock tree to minimize dynamic power consumption. Students will adjust the clock tree structure, reduce unnecessary toggling, and implement selective gating techniques. Through this, they gain skills in power-efficient design practices and understand the importance of an optimized clock network for achieving low-power goals."
      ],
      [
        "Shielding Techniques to Enhance Signal Integrity in Routing",
        "This project involves using shielding techniques to prevent signal interference, especially in high-frequency paths. Students will implement ground shielding, adjust spacing, and use dedicated routes to reduce cross-talk. By maintaining signal integrity through effective shielding, students ensure reliable performance in designs with densely packed high-speed interconnects."
      ],
      [
        "Critical Path Analysis and Timing Optimization",
        "This project involves analyzing critical paths and applying optimization techniques to reduce delay and meet timing requirements. Students will perform static timing analysis, identify high-delay paths, and adjust placement and routing to optimize timing. Through this, they learn to target timing-sensitive paths and achieve timing closure, preparing them to handle performance-critical designs."
      ],
      [
        "Design for Manufacturability and Yield Enhancement Techniques",
        "This project addresses layout modifications to enhance manufacturability and yield. Students will explore DRC compliance, dummy fill insertion, and layout uniformity to improve robustness against fabrication variations. By focusing on yield optimization, they learn techniques to minimize defects and improve production success rates, which is vital for manufacturing scalability."
      ],
      [
        "Implementation of Decoupling Capacitance for Power Integrity",
        "This project focuses on the design and placement of decoupling capacitors to improve power supply integrity across the layout. Students will analyze power grid behavior under varying loads and add capacitors to stabilize the voltage supply. Decoupling capacitors reduce noise and enhance circuit stability, providing a practical understanding of power integrity management."
      ],
      [
        "Skew Reduction Techniques for Clock Distribution Networks",
        "Students will explore techniques to minimize clock skew across the design, ensuring synchronized operation of sequential elements. The project involves optimizing clock buffers, adjusting delays, and balancing clock paths. By achieving reduced skew, students ensure that timing margins are maintained, a critical requirement for clock-intensive designs."
      ],
      [
        "Timing Optimization in Physical Design By Cutting the Capacitance",
        "In this project, students will focus on achieving timing convergence by strategically inserting buffers along critical paths. Buffer insertion reduces delay by breaking long interconnects, enhancing timing performance. This project teaches students the impact of buffers on timing closure and how effective buffer placement can stabilize timing in physical design."
      ],
      [
        "Physical Design for Area Minimization without Timing Violation",
        "This project emphasizes layout compaction techniques to minimize silicon area while maintaining timing integrity. Students will explore cell placement, wire length reduction, and buffer optimization to create a compact design. By balancing area efficiency and timing requirements, students learn to optimize layouts effectively without sacrificing performance, which is vital in cost-sensitive designs."
      ],
      [
        "Routing Optimization for Efficient Congestion Management",
        "This project focuses on routing strategies to manage congestion effectively, especially in high-density areas. Students will explore techniques such as track allocation, layer usage, and buffer insertion to reduce congestion without impacting timing. By managing congestion, they enhance signal flow and reduce design iterations, helping achieve a well-balanced layout and improving design convergence."
      ],
      [
        "Clock Gating Implementation for Dynamic Power Reduction",
        "This project involves implementing clock gating to reduce dynamic power consumption. Students will design and optimize clock gating cells, learning to selectively disable inactive regions of the circuit. By reducing unnecessary clock toggling, they achieve significant power savings, which is especially useful for energy-efficient designs. The project provides experience in power optimization and effective power management at the physical design level."
      ],
      [
        "Floorplanning and Partitioning for Optimized Data Flow and Routing",
        "Students will explore floorplanning techniques, focusing on data flow and routing efficiency. By partitioning the design into functional blocks and planning data paths effectively, they will achieve optimized routing and reduced congestion. This project helps students understand how early design decisions in floorplanning influence layout quality and improve the chances of meeting timing, power, and area constraints in the later stages."
      ],
      [
        "High-Speed Signal Routing for Reduced Delay and Cross-Talk using Layer Promotion and NDR",
        "Focusing on high-speed signal routing, students will implement techniques to minimize delay and cross-talk interference. The project involves optimizing routing paths, controlling impedance, and ensuring signal integrity across critical high-speed paths. Through practical routing optimization, students gain insights into managing signal timing and integrity, essential for designs requiring high-speed data transfer with minimal interference."
      ],
      [
        "Advanced Placement Optimization for Improved Timing Convergence",
        "This project explores placement optimization techniques aimed at enhancing timing convergence. Students will analyze placement algorithms, adjust cell locations, and optimize layout for timing-critical paths. The project focuses on reducing wire lengths, balancing cell density, and achieving efficient distribution of cells. Through these techniques, students will gain hands-on experience with improving timing closure, achieving reduced delays, and ensuring an optimized cell placement to meet timing constraints while enhancing overall design performance."
      ],
      [
        "Insertion and Optimization of ECOs (Engineering Change Orders)",
        "Focusing on ECO techniques, students will implement design changes and optimizations to achieve timing closure post-layout. This project covers efficient ECO insertion methods for timing adjustments, layout modifications, and design rule adherence, equipping students with practical skills for handling last-minute design changes without extensive redesign."
      ],
      [
        "High-Speed I/O Buffer Placement and Optimization",
        "This project focuses on optimizing I/O buffer placement for high-speed applications. Students will apply placement and routing strategies to minimize signal degradation and timing delays, ensuring robust I/O performance, essential for maintaining integrity in designs with high-frequency data transfer."
      ],
      [
        "Multi-Vt Cell Selection for Power and Performance Trade-Off",
        "Implement a multi-Vt cell selection strategy to balance power and performance. Analyze timing paths to select the optimal Vt cells for minimal power consumption without compromising speed."
      ],
      [
        "RC Delay Minimization for Critical Paths",
        "Identify critical paths and optimize RC delays through wire sizing, buffer insertion, and placement adjustments. Focus on achieving timing closure by reducing delay on critical nets."
      ]
    ]
  },
  "design-verification": {
    "title": "Design Verification",
    "pageTitle": "VLSI Design Verification Projects – UVM, SystemVerilog & Simulation Training",
    "metaDescription": "Work on advanced ASIC and FPGA verification projects using UVM, SystemVerilog, and real-world verification flows. Perfect for VLSI students and engineers preparing for core roles.",
    "crumb": "Design Verification Projects",
    "description": "Work on advanced ASIC and FPGA verification projects using UVM, SystemVerilog, and real-world verification flows. Perfect for VLSI students and engineers preparing for core roles.",
    "flowTitle": "Verification Project Flow",
    "flow": [
      "Testbench Development",
      "Stimulus Generation",
      "Simulation and Analysis",
      "Coverage and Debug"
    ],
    "topics": [
      [
        "1X3 Router Design",
        "Create a Verilog module for a 1X3 router, enabling data routing from one input to three outputs. Implement logic for directing incoming data to one of the three output ports based on control signals, facilitating versatile data transmission in digital systems."
      ],
      [
        "UART Implementation",
        "Design and implement a UART (Universal Asynchronous Receiver-Transmitter) transmitter and receiver using Verilog. This involves creating and simulating the UART protocol, developing the necessary logic for the transmitter and receiver, and verifying functionality through test cases."
      ],
      [
        "SPI Controller Design",
        "Develop a Verilog-based SPI (Serial Peripheral Interface) controller. This project involves implementing the SPI protocol, including both master and slave functionalities, and verifying device communication through simulation."
      ],
      [
        "I2C Master/Slave Design",
        "Implement an I2C (Inter-Integrated Circuit) master and slave using Verilog. Design the I2C protocol, implement read and write operations, and verify communication between devices through simulation."
      ],
      [
        "AXI-to-APB Bridge",
        "Design a Verilog code for an AXI-to-APB Bridge, enabling seamless translation between AXI and APB protocols. This module facilitates efficient communication between high-speed processors and slower peripherals in digital systems."
      ],
      [
        "Dual-Port RAM Design",
        "Design a Verilog module for a dual-port RAM, allowing simultaneous read and write operations on two separate ports with independent addresses. Implement collision detection and handling mechanisms to ensure data integrity during concurrent access."
      ],
      [
        "AMBA Protocol",
        "The Advanced Microcontroller Bus Architecture (AMBA) protocol defines how functional blocks communicate with each other in a system-on-chip (SoC)."
      ],
      [
        "FIFO Memory",
        "FIFO (First-In, First-Out) memory is a type of buffer or data storage mechanism where the first data written into the memory is the first to be read out, adhering to the queue-like behavior. It is widely used in digital systems for synchronization, buffering, and data flow management between subsystems operating at different speeds or in different clock domains."
      ],
      [
        "Ethernet Project",
        "Ethernet is a widely used wired networking technology that connects devices in local area networks (LANs) and beyond. It operates based on the IEEE 802.3 standard, utilizing protocols like Carrier Sense Multiple Access with Collision Detection (CSMA/CD) to manage data transmission."
      ],
      [
        "PLL Design",
        "A phase-locked loop (PLL) is a feedback system that generates an output signal with a phase that's related to its input signal. PLLs are designed to synchronize information accurately and to be insensitive to disturbances in the input signal."
      ]
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectCategories;
}

// Keep the standalone authoring template usable when opened directly. The two
// published category pages contain static HTML and do not load this renderer.
if (typeof document !== 'undefined') {
  const rows = document.getElementById('project-rows');
  if (rows) {
    const categoryKey = location.pathname.includes('design-verification')
      ? 'design-verification'
      : 'physical-design';
    const category = projectCategories[categoryKey];
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);

    document.title = category.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', category.metaDescription);
    document.querySelector('.project-hero h1').innerHTML = `<span>${escapeHtml(category.title)}</span> Projects`;
    document.querySelector('.project-hero p').textContent = category.description;
    document.getElementById('category-crumb').textContent = category.crumb;
    document.getElementById('flow-title').textContent = category.flowTitle;
    category.flow.forEach((step, index) => {
      const number = index + 1;
      document.getElementById(`flow-${number}`).textContent = step;
    });
    document.getElementById('project-table-title').textContent = `${category.title} Project Topics`;
    rows.innerHTML = category.topics.map(([title, description], index) => `
      <tr>
        <td>${index + 1}</td>
        <th scope="row">${escapeHtml(title)}</th>
        <td><details><summary>View Details →</summary><p>${escapeHtml(description)}</p></details></td>
      </tr>`).join('');
  }
}

