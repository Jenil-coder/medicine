import {
  FlaskConical, HeartPulse, Pill,
  Dna, Bug, ShieldCheck, Eye,
  CheckCircle2, Droplets, Fingerprint,
  Syringe, Box, TestTube, Scale, Microscope
} from 'lucide-react';

export const applicationsData = [
  {
    id: 'life-clinical',
    title: 'Life Sciences & Clinical',
    shortTitle: 'Life Sciences',
    icon: FlaskConical,
    color: '#10B981',
    image: '/life_sciences.png',
    overview: 'Comprehensive solutions driving biological research, cellular analysis, and clinical discovery.',
    workflows: [
      {
        title: 'Molecular Biology',
        description: 'State-of-the-art instruments and reagents for PCR, RTPCR, NGS, Micro Array, Sanger Sequencing, and nucleic acid extraction.',
        extendedDescription: 'Complete workflow solutions for molecular analysis. From automated nucleic acid extraction to high-throughput sequencing and real-time PCR, these platforms ensure high sensitivity and reproducibility for complex genetic research.',
        keyFeatures: ['High-throughput automated extraction platforms', 'Next-Generation Sequencing (NGS) systems', 'Real-time PCR (qPCR) thermal cyclers', 'Sanger Sequencing and Micro Array solutions'],
        relatedProducts: ['Automated Nucleic Acid Extractor', 'Real-Time PCR System', 'Next-Generation Sequencer'],
        icon: Dna, image: '/pcr_real.png',
      },
      {
        title: 'Microbiology',
        description: 'Reliable culture media, incubators, sterilizers, and diagnostic tools for accurate microbial analysis.',
        extendedDescription: 'End-to-end microbiology solutions encompassing high-quality dehydrated culture media, automated microbial identification systems, and precision incubation equipment.',
        keyFeatures: ['ISO-compliant dehydrated culture media', 'Precision CO2 and standard incubators', 'Automated microbial identification systems', 'Advanced autoclaves and sterilizers'],
        relatedProducts: ['Precision CO2 Incubator', 'Automated Microbial ID System', 'Prepared Culture Plates'],
        icon: Bug, image: '/pathogen_virology.png',
      },
      {
        title: 'Immunology',
        description: 'Advanced flow cytometers, ELISA kits, and immune assay solutions for comprehensive immunological testing.',
        extendedDescription: 'Robust immunological testing platforms including high-parameter flow cytometers and sensitive ELISA kits optimized for detecting antibodies and antigens.',
        keyFeatures: ['Multi-parameter flow cytometry analyzers', 'High-sensitivity ELISA and multiplex assays', 'Automated immunoassay workstations', 'Validated antibodies and protein standards'],
        relatedProducts: ['High-Parameter Flow Cytometer', 'Automated ELISA Processor', 'Multiplex Cytokine Assay Kits'],
        icon: ShieldCheck, image: '/cell_culture.png',
      },
      {
        title: 'Cytology & Histopathology',
        description: 'Microscopes, staining kits, and slide preparation tools for detailed cellular and tissue analysis.',
        extendedDescription: 'Precision instruments for tissue processing and morphological analysis — from advanced microtomes and automated slide stainers to high-resolution clinical microscopes.',
        keyFeatures: ['Automated tissue processors and microtomes', 'High-resolution clinical microscopes', 'Standardized H&E and special staining kits', 'Digital pathology scanning systems'],
        relatedProducts: ['Automated Tissue Processor', 'Clinical Upright Microscope', 'Digital Slide Scanner'],
        icon: Eye, image: '/cell_gene_therapy.png',
      }
    ]
  },
  {
    id: 'diagnostics-testing',
    title: 'Diagnostics & Testing',
    shortTitle: 'Diagnostics',
    icon: HeartPulse,
    color: '#3B82F6',
    image: '/clinical_diagnostics.png',
    overview: 'Rapid, reliable diagnostic equipment and specialized testing solutions for healthcare and forensic applications.',
    workflows: [
      {
        title: 'Point of Care Testing',
        description: "Portable and rapid diagnostic devices for quick and accurate testing at the patient's side.",
        extendedDescription: 'Decentralized testing platforms that deliver lab-quality results in minutes. Ideal for clinics, emergency rooms, and remote locations with CLIA-waived ease-of-use.',
        keyFeatures: ['Results delivered in under 30 minutes', 'Portable and battery-operated readers', 'Room-temperature stable test cartridges', 'Seamless LIS/HIS connectivity'],
        relatedProducts: ['Portable POC Molecular Reader', 'Cardiac Biomarker Analyzer', 'Respiratory Panel Cartridges'],
        icon: HeartPulse, image: '/poc_testing.png',
      },
      {
        title: 'Rapid Testing',
        description: 'Wide range of rapid test kits for infectious diseases, pregnancy, and other critical diagnostics.',
        extendedDescription: 'Lateral flow and rapid diagnostic test (RDT) solutions for immediate clinical decision-making. Highly sensitive kits for large-scale screening.',
        keyFeatures: ['High sensitivity lateral flow assays', 'Infectious disease and DOA panels', 'Visual and instrument-read options', 'Long shelf-life formulations'],
        relatedProducts: ['Infectious Disease Rapid Kits', 'Automated RDT Reader', 'Drugs of Abuse (DOA) Panels'],
        icon: CheckCircle2, image: '/pathogen_virology.png',
      },
      {
        title: 'Blood Bank Services',
        description: 'Complete blood analyzers, storage systems, and screening kits for safe blood banking operations.',
        extendedDescription: 'End-to-end blood banking infrastructure from donor screening and blood grouping analyzers to ultra-reliable blood bank refrigerators and freezers.',
        keyFeatures: ['Automated blood grouping analyzers', 'Medical-grade blood bank refrigerators (4°C)', 'Plasma freezers (-30°C to -40°C)', 'Infectious disease screening assays'],
        relatedProducts: ['Automated Blood Grouping System', 'Medical-Grade Blood Refrigerator', 'Platelet Agitator and Incubator'],
        icon: Droplets, image: '/biobanking_storage.png',
      },
      {
        title: 'Forensics',
        description: 'Specialized forensic equipment for DNA analysis, toxicology, and crime scene investigation.',
        extendedDescription: 'Advanced analytical tools for forensic laboratories featuring sensitive DNA extraction kits, genetic analyzers for human identification, and robust LC-MS systems.',
        keyFeatures: ['Human identification (HID) genetic analyzers', 'Trace evidence collection and extraction kits', 'High-resolution LC-MS/MS for toxicology', 'Chain-of-custody tracking software'],
        relatedProducts: ['Forensic Genetic Analyzer', 'Rapid DNA Extraction Kits', 'Toxicology LC-MS/MS System'],
        icon: Fingerprint, image: '/dna_rna_extraction.png',
      }
    ]
  },
  {
    id: 'pharma-infrastructure',
    title: 'Pharma & Lab Infrastructure',
    shortTitle: 'Infrastructure',
    icon: Pill,
    color: '#8B5CF6',
    image: '/pharma_biopharma.png',
    overview: 'Industrial-grade bioprocessing equipment, liquid handling automation, and complete turnkey laboratory setups.',
    workflows: [
      {
        title: 'Biopharmaceuticals',
        description: 'High-precision instruments for drug development, quality control, and bioprocessing.',
        extendedDescription: 'Scalable equipment for biotherapeutic development and manufacturing. From single-use bioreactors to downstream chromatography supporting cGMP compliant operations.',
        keyFeatures: ['Single-use bioreactors and mixers', 'cGMP compliant analytical instruments', 'Process chromatography systems', 'Environmental monitoring solutions'],
        relatedProducts: ['Single-Use Bioreactor System', 'Preparative Chromatography System', 'Pharmaceutical QC HPLC'],
        icon: Pill, image: '/pharma_biopharma.png',
      },
      {
        title: 'Liquid Handling Solutions',
        description: 'Precision pipettes, automated liquid handlers, and accessories for improved accuracy in sample preparation.',
        extendedDescription: 'Automated and manual pipetting solutions that enhance throughput and eliminate human error in genomics sample prep and high-throughput screening.',
        keyFeatures: ['Automated 96/384-well pipetting robots', 'Ergonomic electronic and manual pipettes', 'Low-retention robotic pipette tips', 'Gravimetric calibration systems'],
        relatedProducts: ['Automated Liquid Handling Robot', 'Multichannel Electronic Pipettes', 'Automated Plate Dispenser'],
        icon: Syringe, image: '/food_beverage.png',
      },
      {
        title: 'Laboratory Equipment',
        description: 'Versatile lab instruments including centrifuges, autoclaves, refrigerators, and freezers.',
        extendedDescription: 'The backbone of any functional laboratory — a comprehensive range of reliable everyday equipment built for durability and consistent performance.',
        keyFeatures: ['High-speed refrigerated centrifuges', 'Ultra-low temperature (-80°C) freezers', 'Class II biological safety cabinets', 'Precision water baths and shakers'],
        relatedProducts: ['Floor-Standing Ultracentrifuge', '-80°C ULT Freezer', 'Class II Type A2 Biosafety Cabinet'],
        icon: Box, image: '/clinical_diagnostics.png',
      },
      {
        title: 'Lab Disposables',
        description: 'Quality consumables such as pipette tips, tubes, plates, and gloves for daily laboratory operations.',
        extendedDescription: 'High-purity, certified RNase/DNase-free consumables and protective gear manufactured under strict quality control to prevent sample contamination.',
        keyFeatures: ['RNase/DNase and pyrogen-free certification', 'Filtered and low-retention pipette tips', 'Deep-well plates and PCR tubes', 'Nitrile examination gloves and PPE'],
        relatedProducts: ['Barrier Filter Pipette Tips', 'Microcentrifuge Tubes', 'Laboratory Nitrile Gloves'],
        icon: TestTube, image: '/dna_rna_extraction.png',
      },
      {
        title: 'Turnkey Solutions',
        description: 'End-to-end laboratory setup including design, installation, and validation for seamless operations.',
        extendedDescription: 'Complete laboratory design and deployment services managing the entire lifecycle from architectural planning to equipment installation, IQ/OQ/PQ validation, and staff training.',
        keyFeatures: ['Comprehensive lab layout and 3D design', 'Equipment procurement and installation', 'IQ/OQ/PQ validation services', 'Dedicated project management'],
        relatedProducts: ['Modular Laboratory Furniture', 'Fume Hoods and Exhaust Systems', 'Lab Validation Service Package'],
        icon: Scale, image: '/life_sciences.png',
      }
    ]
  }
];
