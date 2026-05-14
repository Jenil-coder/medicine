import {
  Dna, Microscope, ShieldCheck, FlaskConical, TestTube,
  Fingerprint, HeartPulse, Leaf, Droplets, Box,
  Pill, Syringe, Monitor, Scale, Settings
} from 'lucide-react';

export const applicationsData = [
  {
    id: 'molecular-diagnostics',
    title: 'Molecular Diagnostics',
    shortTitle: 'Mol. Diagnostics',
    icon: Dna,
    color: '#3B82F6',
    image: '/pcr_real.png',
    overview: 'Advanced PCR, NGS, and sequencing platforms enabling precise molecular-level disease detection and research.',
    workflows: [
      {
        title: 'Real-Time PCR & qPCR',
        description: 'High-sensitivity quantitative PCR systems for gene expression, pathogen detection, and SNP genotyping.',
        extendedDescription: 'Real-time PCR platforms deliver quantitative insights with unmatched sensitivity. Suitable for clinical diagnostics, research, and high-throughput screening environments with validated assay kits.',
        keyFeatures: ['96/384-well high-throughput formats', 'Multiplex detection with 6-channel optics', 'Validated ready-to-use assay kits', 'Fast 45-minute run time'],
        relatedProducts: ['Real-Time PCR System (96-well)', 'Multiplex qPCR Master Mix', 'Pathogen Detection Kit Panel'],
        icon: Dna, image: '/pcr_real.png',
      },
      {
        title: 'Next-Generation Sequencing',
        description: 'High-throughput NGS platforms for whole-genome, targeted panel, and RNA sequencing workflows.',
        extendedDescription: 'Scalable NGS solutions from benchtop to clinical-grade instruments, delivering comprehensive genomic insights for research, oncology, and infectious disease applications.',
        keyFeatures: ['Short-read and long-read platforms', 'Automated library preparation', 'On-board bioinformatics pipeline', 'Clinical-grade variant calling'],
        relatedProducts: ['Benchtop NGS Sequencer', 'Library Prep Automation Kit', 'Variant Analysis Software'],
        icon: Dna, image: '/dna_rna_extraction.png',
      },
      {
        title: 'Nucleic Acid Extraction',
        description: 'Automated and manual extraction systems for DNA/RNA from diverse biological samples.',
        extendedDescription: 'High-purity nucleic acid extraction platforms supporting magnetic bead, spin-column, and automated liquid-handling approaches for clinical and research specimens.',
        keyFeatures: ['Automated 96-sample processing', 'High-purity A260/280 > 1.8', 'Blood, tissue, swab compatibility', 'Integrated inhibitor removal'],
        relatedProducts: ['Automated Nucleic Acid Extractor', 'RNA Extraction Spin Kit', 'Viral RNA Isolation Kit'],
        icon: Dna, image: '/pcr_real.png',
      },
      {
        title: 'Sanger Sequencing',
        description: 'Capillary electrophoresis platforms for confirmatory sequencing and fragment analysis.',
        extendedDescription: 'Gold-standard Sanger sequencing systems used for mutation confirmation, microbial identification, and plasmid verification in clinical and research settings.',
        keyFeatures: ['1–24 capillary configurations', 'Bidirectional sequencing support', 'Fragment analysis capability', 'PhiX-calibrated accuracy'],
        relatedProducts: ['Capillary Electrophoresis System', 'BigDye Terminator Kit', 'Fragment Analysis Reagents'],
        icon: Dna, image: '/dna_rna_extraction.png',
      }
    ]
  },
  {
    id: 'cell-biology',
    title: 'Cell Biology',
    shortTitle: 'Cell Biology',
    icon: Microscope,
    color: '#10B981',
    image: '/cell_culture.png',
    overview: 'Complete cell culture, imaging, and analysis solutions for life science and biomedical research.',
    workflows: [
      {
        title: 'Cell Culture & Expansion',
        description: 'Incubators, media, and consumables for reliable primary and immortalized cell culture.',
        extendedDescription: 'End-to-end cell culture infrastructure including CO2 incubators, culture media, cryopreservation systems, and biosafety cabinets to maintain cell viability and reproducibility.',
        keyFeatures: ['Precision CO2 and humidity control', 'T-flask, spinner, and bioreactor formats', 'Animal-free defined media', 'Cryopreservation and biobanking support'],
        relatedProducts: ['CO2 Incubator (170L)', 'Serum-Free Cell Culture Media', 'Class II Biosafety Cabinet'],
        icon: Microscope, image: '/cell_culture.png',
      },
      {
        title: 'Flow Cytometry',
        description: 'Multi-parameter analyzers and cell sorters for immunophenotyping and functional assays.',
        extendedDescription: 'High-parameter flow cytometry systems enabling detailed cell population analysis, rare event detection, and functional assays for immunology, oncology, and stem cell research.',
        keyFeatures: ['Up to 40-parameter detection', 'High-speed cell sorting (>50,000 events/sec)', 'Spectral unmixing algorithms', 'Validated antibody panels'],
        relatedProducts: ['High-Parameter Flow Cytometer', 'Cell Sorter System', 'Lyophilized Antibody Panel Kit'],
        icon: Microscope, image: '/cell_culture.png',
      },
      {
        title: 'Cell Imaging & Analysis',
        description: 'Fluorescence microscopes and automated imaging systems for morphological and functional studies.',
        extendedDescription: 'Wide-field, confocal, and high-content screening platforms providing quantitative cell imaging with automated image analysis software for high-throughput applications.',
        keyFeatures: ['Confocal and widefield configurations', 'Automated plate imaging', 'AI-driven image segmentation', 'Live-cell time-lapse imaging'],
        relatedProducts: ['Inverted Fluorescence Microscope', 'High-Content Imaging System', 'CellProfiler Analysis Software'],
        icon: Microscope, image: '/cell_culture.png',
      }
    ]
  },
  {
    id: 'cell-gene-therapy',
    title: 'Cell and Gene Therapy',
    shortTitle: 'CGT',
    icon: ShieldCheck,
    color: '#8B5CF6',
    image: '/cell_gene_therapy.png',
    overview: 'Specialized platforms for viral vector production, cell therapy manufacturing, and gene editing applications.',
    workflows: [
      {
        title: 'Viral Vector Production',
        description: 'Bioreactors and downstream processing for AAV, lentiviral, and adenoviral vector manufacturing.',
        extendedDescription: 'Scalable viral vector manufacturing platforms from lab-scale to clinical production, including transfection reagents, purification systems, and analytical characterization tools.',
        keyFeatures: ['Single-use bioreactor systems', 'High-efficiency transfection reagents', 'Affinity purification columns', 'Vector genome titre assays'],
        relatedProducts: ['Single-Use Bioreactor (3L–50L)', 'Transfection Reagent Kit', 'AAV Purification Column'],
        icon: ShieldCheck, image: '/cell_gene_therapy.png',
      },
      {
        title: 'Gene Editing (CRISPR)',
        description: 'CRISPR-Cas9 delivery tools, guide RNA libraries, and on-target verification assays.',
        extendedDescription: 'Comprehensive CRISPR gene editing toolkits enabling precise genome modification in primary cells and cell lines, with off-target detection and functional validation workflows.',
        keyFeatures: ['Pre-designed sgRNA libraries', 'Cas9 ribonucleoprotein delivery', 'T7E1 and digital PCR validation', 'HDR and NHEJ efficiency analysis'],
        relatedProducts: ['CRISPR-Cas9 Editing Kit', 'Electroporation System', 'Guide RNA Synthesis Kit'],
        icon: ShieldCheck, image: '/cell_gene_therapy.png',
      },
      {
        title: 'Cell Therapy Manufacturing',
        description: 'GMP-grade T-cell expansion, CAR-T manufacturing, and quality testing platforms.',
        extendedDescription: 'Closed-system, GMP-compliant cell therapy manufacturing solutions for CAR-T, NK cell, and dendritic cell therapies, including activation, expansion, and cryopreservation.',
        keyFeatures: ['Closed-system GMP bioreactors', 'T-cell activation and expansion kits', 'Cryopreservation bags and systems', 'Release testing assay panels'],
        relatedProducts: ['G-Rex Cell Expansion System', 'CAR-T Activation Kit', 'Controlled-Rate Cell Freezer'],
        icon: ShieldCheck, image: '/cell_gene_therapy.png',
      }
    ]
  },
  {
    id: 'analytical-science',
    title: 'Analytical Science',
    shortTitle: 'Analytical',
    icon: FlaskConical,
    color: '#F59E0B',
    image: '/clinical_diagnostics.png',
    overview: 'Chromatography, spectroscopy, and mass spectrometry instruments for precise chemical and biochemical analysis.',
    workflows: [
      {
        title: 'Chromatography (HPLC/UHPLC)',
        description: 'High-performance liquid chromatography systems for pharmaceutical, food, and environmental analysis.',
        extendedDescription: 'Robust HPLC and UHPLC platforms with UV, DAD, fluorescence, and MS detection for method development, QC testing, and regulated pharmaceutical analysis.',
        keyFeatures: ['Quaternary and binary gradient systems', 'Sub-2-micron column compatibility', 'CFR Part 11 compliant software', 'Automated sample injection'],
        relatedProducts: ['UHPLC System with DAD', 'Reversed-Phase C18 Columns', 'Chromatography Data System (CDS)'],
        icon: FlaskConical, image: '/clinical_diagnostics.png',
      },
      {
        title: 'Mass Spectrometry',
        description: 'LC-MS/MS and GC-MS systems for targeted quantitation and untargeted metabolomics.',
        extendedDescription: 'Triple-quadrupole and high-resolution mass spectrometry platforms for clinical biomarker discovery, toxicology, environmental testing, and pharmaceutical impurity profiling.',
        keyFeatures: ['Triple-quadrupole MRM workflows', 'High-resolution accurate mass (QTOF)', 'Automated sample preparation', 'Spectral library matching'],
        relatedProducts: ['LC-MS/MS Triple Quadrupole', 'QTOF High-Resolution System', 'Automated SPE Station'],
        icon: FlaskConical, image: '/clinical_diagnostics.png',
      },
      {
        title: 'Spectroscopy (UV/Vis & IR)',
        description: 'UV-Vis, FTIR, and Raman instruments for material characterization and purity testing.',
        extendedDescription: 'Bench-top and portable spectroscopy instruments for identity testing, concentration measurement, and polymorphism screening in QC and materials research.',
        keyFeatures: ['Single and double-beam UV-Vis', 'ATR-FTIR accessories', 'Handheld Raman analyzers', 'GMP-ready software modules'],
        relatedProducts: ['UV-Vis Spectrophotometer', 'ATR-FTIR Spectrometer', 'Handheld Raman Analyzer'],
        icon: FlaskConical, image: '/clinical_diagnostics.png',
      }
    ]
  },
  {
    id: 'chemicals',
    title: 'Chemicals',
    shortTitle: 'Chemicals',
    icon: TestTube,
    color: '#EF4444',
    image: '/pharma_biopharma.png',
    overview: 'High-purity laboratory chemicals, solvents, standards, and reagents for research and quality control.',
    workflows: [
      {
        title: 'HPLC & Analytical Grade Solvents',
        description: 'Ultra-pure HPLC, UHPLC, and LC-MS grade solvents for chromatographic separations.',
        extendedDescription: 'High-purity solvents manufactured under strict QC protocols with low UV absorbance, minimal residue, and documented lot-to-lot consistency for reliable analytical results.',
        keyFeatures: ['HPLC, UHPLC, and LC-MS grades', 'Ultra-low UV cutoff specifications', 'Certificate of Analysis per lot', 'Fluorescent and residue tested'],
        relatedProducts: ['Acetonitrile (LC-MS Grade, 4L)', 'Methanol (HPLC Grade)', 'Water (LC-MS Grade)'],
        icon: TestTube, image: '/pharma_biopharma.png',
      },
      {
        title: 'Reference Standards',
        description: 'Certified reference standards and primary standards for pharmaceutical and environmental testing.',
        extendedDescription: 'Traceable certified reference materials (CRMs) for method validation, instrument calibration, and regulatory submission supporting USP, EP, and ICH guidelines.',
        keyFeatures: ['USP, EP, and BP grade standards', 'Traceability to NIST/SI units', 'Certificate of Analysis included', 'Long shelf-life stable formulations'],
        relatedProducts: ['Pharmacopoeial Reference Standards', 'Environmental Calibration Mix', 'Multi-element ICP Standard'],
        icon: TestTube, image: '/pharma_biopharma.png',
      },
      {
        title: 'Biochemical Reagents',
        description: 'Buffers, enzymes, proteins, and stains for molecular biology and biochemistry assays.',
        extendedDescription: 'Molecular biology grade reagents including restriction enzymes, PCR buffers, electrophoresis stains, and protein assay kits for routine and specialized laboratory workflows.',
        keyFeatures: ['RNase/DNase-free certification', 'Molecular biology grade purity', 'Unit activity and stability tested', 'Ready-to-use formulations'],
        relatedProducts: ['Agarose Gel (Molecular Grade)', 'Protein Assay Kit (Bradford)', 'Restriction Enzyme Set'],
        icon: TestTube, image: '/pharma_biopharma.png',
      }
    ]
  },
  {
    id: 'forensic-science',
    title: 'Forensic Science',
    shortTitle: 'Forensics',
    icon: Fingerprint,
    color: '#6366F1',
    image: '/forensic_sciences.png',
    overview: 'Specialized forensic DNA, toxicology, and trace evidence solutions for law enforcement and legal laboratories.',
    workflows: [
      {
        title: 'Human Identification (HID)',
        description: 'STR profiling and genetic analysis platforms for forensic human identification.',
        extendedDescription: 'Validated HID workflows from DNA extraction through CE-based STR profiling, meeting CODIS and international database standards for criminal investigation and mass disaster identification.',
        keyFeatures: ['CODIS-compatible STR kits', 'Low-copy number (LCN) protocols', 'Mixture interpretation software', 'Chain-of-custody tracking'],
        relatedProducts: ['Forensic DNA Extraction Kit', 'GlobalFiler STR Amplification Kit', 'Genetic Analyzer (HID)'],
        icon: Fingerprint, image: '/forensic_sciences.png',
      },
      {
        title: 'Toxicology',
        description: 'LC-MS/MS and immunoassay platforms for drugs-of-abuse, poison, and toxin screening.',
        extendedDescription: 'Comprehensive toxicology screening and confirmation solutions using immunoassay presumptive tests followed by LC-MS/MS confirmation for post-mortem, clinical, and workplace testing.',
        keyFeatures: ['Multi-drug immunoassay panels', 'LC-MS/MS confirmation libraries', 'Hair, blood, urine matrices', 'SOFT/AAFS-compliant protocols'],
        relatedProducts: ['DOA Immunoassay Analyzer', 'Toxicology LC-MS/MS System', 'Solid-Phase Extraction Plates'],
        icon: Fingerprint, image: '/forensic_sciences.png',
      },
      {
        title: 'Trace & Digital Evidence',
        description: 'Microscopy, chemical analysis, and digital forensics tools for physical evidence examination.',
        extendedDescription: 'Analytical platforms for fibre, paint, glass, explosive, and gunshot residue analysis, combined with digital evidence examination tools for cyber forensic investigations.',
        keyFeatures: ['Scanning electron microscopy (SEM-EDX)', 'FTIR and Raman microspectroscopy', 'GSR elemental mapping', 'Digital evidence chain-of-custody'],
        relatedProducts: ['Forensic FTIR Microscope', 'SEM-EDX System', 'Digital Evidence Workstation'],
        icon: Fingerprint, image: '/forensic_sciences.png',
      }
    ]
  },
  {
    id: 'animal-health',
    title: 'Animal Health',
    shortTitle: 'Animal Health',
    icon: HeartPulse,
    color: '#14B8A6',
    image: '/pathogen_virology.png',
    overview: 'Veterinary diagnostic instruments, rapid tests, and analytical solutions for companion and production animal health.',
    workflows: [
      {
        title: 'Veterinary Rapid Diagnostics',
        description: 'Point-of-care lateral flow assays for infectious disease detection in animals.',
        extendedDescription: 'USDA/OIE-validated rapid test kits for detection of major veterinary pathogens including PRRS, FMD, AI, ASF, and canine/feline diseases at the point of care.',
        keyFeatures: ['10–15 minute time to result', 'Species-specific validated kits', 'No refrigeration required', 'High sensitivity and specificity'],
        relatedProducts: ['Canine/Feline Combo Rapid Test', 'Avian Influenza Antigen Kit', 'Foot and Mouth Disease Test'],
        icon: HeartPulse, image: '/pathogen_virology.png',
      },
      {
        title: 'Veterinary Clinical Chemistry',
        description: 'Benchtop analyzers for haematology, biochemistry, and urinalysis in veterinary practice.',
        extendedDescription: 'Compact benchtop veterinary clinical chemistry and haematology analyzers calibrated for canine, feline, equine, and bovine species, delivering rapid in-clinic results.',
        keyFeatures: ['Species-specific reference ranges', 'Whole-blood haematology profiles', 'Comprehensive metabolic panels', 'Urine sediment analysis'],
        relatedProducts: ['Veterinary Haematology Analyzer', 'Portable Biochemistry Analyzer', 'Urine Dipstick Reader'],
        icon: HeartPulse, image: '/pathogen_virology.png',
      },
      {
        title: 'Molecular Veterinary Diagnostics',
        description: 'PCR and serology platforms for accurate pathogen identification and antibody titre testing.',
        extendedDescription: 'Real-time PCR and ELISA-based serology platforms for confirmatory diagnosis of notifiable and endemic veterinary diseases in government and private reference laboratories.',
        keyFeatures: ['OIE-validated molecular assays', 'Multi-pathogen panel PCR kits', 'ELISA antibody titre assays', 'NABL-accreditable protocols'],
        relatedProducts: ['Veterinary Real-Time PCR System', 'Avian Serology ELISA Kit', 'Multiplex Respiratory Panel'],
        icon: HeartPulse, image: '/pathogen_virology.png',
      }
    ]
  },
  {
    id: 'agri-veterinary',
    title: 'Agri, Veterinary & Animal Health',
    shortTitle: 'Agri & Vet',
    icon: Leaf,
    color: '#84CC16',
    image: '/food_beverage.png',
    overview: 'Agricultural testing, soil analysis, food safety, and veterinary residue detection instruments.',
    workflows: [
      {
        title: 'Pesticide & Residue Testing',
        description: 'GC-MS/MS and LC-MS/MS systems for multi-residue pesticide analysis in food and feed.',
        extendedDescription: 'Rapid and sensitive multi-residue pesticide screening workflows using QuEChERS extraction followed by GC-MS/MS or LC-MS/MS confirmation meeting EU MRL and Codex standards.',
        keyFeatures: ['QuEChERS-optimised workflows', '>500 compound screening panels', 'EU MRL-compliant reporting', 'Automated data processing'],
        relatedProducts: ['GC-MS/MS Triple Quadrupole', 'QuEChERS Extraction Kits', 'Pesticide Reference Standard Mix'],
        icon: Leaf, image: '/food_beverage.png',
      },
      {
        title: 'Soil & Water Analysis',
        description: 'ICP-OES, ion chromatography, and pH/nutrient analysers for soil and water quality monitoring.',
        extendedDescription: 'Comprehensive soil and water analytical instrumentation for measuring heavy metals, anions, cations, pH, and nutrient levels to support agronomic decision-making and regulatory compliance.',
        keyFeatures: ['ICP-OES multi-element analysis', 'Ion chromatography for anions', 'Portable field pH/EC meters', 'BOD/COD/TOC measurement'],
        relatedProducts: ['ICP-OES Spectrometer', 'Ion Chromatography System', 'Portable Multiparameter Meter'],
        icon: Leaf, image: '/food_beverage.png',
      },
      {
        title: 'Mycotoxin & Allergen Testing',
        description: 'Lateral flow and ELISA kits for rapid mycotoxin, allergen, and adulterant detection.',
        extendedDescription: 'Rapid immunoassay platforms for aflatoxin, ochratoxin, deoxynivalenol, and major food allergen detection in grain, feed, and processed food matrices meeting FSSAI and Codex limits.',
        keyFeatures: ['Lateral flow quantitative readers', 'ELISA microplate formats', 'ppb-level sensitivity', 'FSSAI and Codex compliant'],
        relatedProducts: ['Mycotoxin Rapid Test Reader', 'Aflatoxin ELISA Kit', 'Allergen Detection Panel'],
        icon: Leaf, image: '/food_beverage.png',
      }
    ]
  },
  {
    id: 'point-of-care',
    title: 'Point of Care Solutions',
    shortTitle: 'Point of Care',
    icon: Droplets,
    color: '#F97316',
    image: '/poc_testing.png',
    overview: 'Rapid, portable diagnostic platforms delivering lab-quality results in minutes at the bedside or clinic.',
    workflows: [
      {
        title: 'Molecular POC Testing',
        description: 'Rapid molecular (LAMP/PCR) platforms for infectious disease detection within 30 minutes.',
        extendedDescription: 'CLIA-waived portable molecular instruments delivering PCR-quality results for respiratory viruses, STIs, and sepsis markers in emergency departments, clinics, and remote settings.',
        keyFeatures: ['Results in under 30 minutes', 'CLIA-waived operation', 'Cartridge-based, no sample prep', 'Respiratory, GI, and STI panels'],
        relatedProducts: ['Portable Molecular POC Reader', 'Respiratory Syndromic Panel', 'STI Cartridge Panel'],
        icon: Droplets, image: '/poc_testing.png',
      },
      {
        title: 'Immunoassay & Lateral Flow',
        description: 'Rapid antigen and antibody tests for infectious disease, cardiac markers, and hormones.',
        extendedDescription: 'Quantitative lateral flow readers and multiplex immunoassay platforms for cardiac troponin, CRP, D-dimer, HbA1c, and infectious disease screening at the point of care.',
        keyFeatures: ['Quantitative reader-based results', 'Cardiac biomarker panels', '10-minute turnaround', 'Bluetooth data connectivity'],
        relatedProducts: ['Quantitative Rapid Test Reader', 'Cardiac Panel Cartridge', 'CRP/PCT Rapid Test Kit'],
        icon: Droplets, image: '/poc_testing.png',
      },
      {
        title: 'Blood Glucose & HbA1c',
        description: 'POCT glucose monitors, HbA1c analyzers, and whole-blood metabolite systems.',
        extendedDescription: 'Handheld and desktop blood glucose and HbA1c monitoring systems for diabetes management in clinical and community health settings with connectivity to EMR systems.',
        keyFeatures: ['Fingerstick whole-blood analysis', 'NGSP-certified HbA1c method', 'EMR/LIS connectivity', 'QC data management software'],
        relatedProducts: ['Point-of-Care HbA1c Analyzer', 'Blood Glucose Monitor (Clinical)', 'Blood Gas & Electrolyte Analyzer'],
        icon: Droplets, image: '/poc_testing.png',
      }
    ]
  },
  {
    id: 'lab-equipment',
    title: 'Lab Equipment',
    shortTitle: 'Lab Equipment',
    icon: Box,
    color: '#64748B',
    image: '/clinical_diagnostics.png',
    overview: 'General and specialized laboratory instruments — centrifuges, incubators, sterilizers, and cold storage for every lab.',
    workflows: [
      {
        title: 'Centrifugation',
        description: 'Microcentrifuges, refrigerated centrifuges, and ultracentrifuges for sample processing.',
        extendedDescription: 'Comprehensive centrifugation portfolio from compact personal micro centrifuges to high-capacity floor-standing refrigerated units, supporting density gradient, cell harvesting, and preparative isolation.',
        keyFeatures: ['Up to 150,000 × g ultracentrifuge', 'Refrigerated (–20°C to +40°C) models', 'Swinging-bucket and fixed-angle rotors', 'Imbalance detection and auto-stop'],
        relatedProducts: ['Refrigerated Microcentrifuge', 'Floor-Standing Ultracentrifuge', 'High-Capacity Centrifuge (6×1L)'],
        icon: Box, image: '/clinical_diagnostics.png',
      },
      {
        title: 'Cold Chain & Storage',
        description: 'Refrigerators, –80°C freezers, liquid nitrogen tanks, and temperature monitoring systems.',
        extendedDescription: 'Medical-grade cold storage solutions maintaining critical sample and reagent integrity from +4°C laboratory refrigerators to –196°C liquid nitrogen dewars with real-time temperature monitoring.',
        keyFeatures: ['–80°C ULT energy-efficient models', 'Liquid nitrogen dewars (25L–500L)', 'IoT temperature alarm systems', 'Pharmaceutical-grade blood banks'],
        relatedProducts: ['-80°C ULT Freezer (500L)', 'Blood Bank Refrigerator', 'Liquid Nitrogen Dewar (50L)'],
        icon: Box, image: '/biobanking_storage.png',
      },
      {
        title: 'Sterilization & Safety',
        description: 'Autoclaves, biosafety cabinets, and fume hoods ensuring laboratory safety and sterility.',
        extendedDescription: 'Laboratory sterilization and safety equipment including bench-top and floor-standing autoclaves, Class II biological safety cabinets, and chemical fume hoods meeting EN12469 standards.',
        keyFeatures: ['Gravity and vacuum cycle autoclaves', 'Class II Type A2 biosafety cabinets', 'HEPA filtered airflow systems', 'EN/NSF certified models'],
        relatedProducts: ['Bench-Top Autoclave (23L)', 'Class II Biosafety Cabinet', 'Chemical Fume Hood (1.2m)'],
        icon: Box, image: '/clinical_diagnostics.png',
      }
    ]
  },
  {
    id: 'lab-consumables',
    title: 'Lab Consumables',
    shortTitle: 'Consumables',
    icon: Pill,
    color: '#EC4899',
    image: '/dna_rna_extraction.png',
    overview: 'High-purity plastic ware, pipette tips, tubes, plates, and PPE for daily laboratory operations.',
    workflows: [
      {
        title: 'Pipette Tips & Tubes',
        description: 'RNase/DNase-free filtered tips, microtubes, and PCR strips for molecular workflows.',
        extendedDescription: 'Ultra-clean, low-retention filtered and unfiltered pipette tips paired with microcentrifuge tubes, PCR strips, and cryovials manufactured under ISO Class 7 clean room conditions.',
        keyFeatures: ['RNase/DNase and pyrogen-free', 'Low-retention surface treatment', 'Universal tip compatibility', 'Lot-traceable QC documentation'],
        relatedProducts: ['Filtered Pipette Tips (10μL–1000μL)', 'Low-Binding Microcentrifuge Tubes', 'PCR 8-Strip Tubes with Caps'],
        icon: Pill, image: '/dna_rna_extraction.png',
      },
      {
        title: 'Microplates & Dishes',
        description: 'Cell culture plates, 96/384-well PCR plates, and ELISA plates for high-throughput assays.',
        extendedDescription: 'Full range of tissue culture treated, non-binding, and specialty microplates in standard SBS footprints compatible with liquid handlers and automated plate readers.',
        keyFeatures: ['TC-treated and ultra-low attachment', 'White, black, and clear well formats', 'Half-area and small-volume plates', 'Automation-compatible skirted plates'],
        relatedProducts: ['96-Well PCR Plate (semi-skirted)', '384-Well White Microplate', '6-Well Cell Culture Plate'],
        icon: Pill, image: '/dna_rna_extraction.png',
      },
      {
        title: 'PPE & Lab Wear',
        description: 'Nitrile gloves, lab coats, safety goggles, and chemical-resistant protective equipment.',
        extendedDescription: 'Laboratory personal protective equipment including powder-free nitrile gloves, chemical-resistant lab coats, impact-resistant safety eyewear, and respiratory protection for all biosafety levels.',
        keyFeatures: ['Powder-free nitrile formulation', 'Chemotherapy-rated gloves available', 'EN374 chemical resistance rated', 'ASTM D6319 medical grade'],
        relatedProducts: ['Powder-Free Nitrile Gloves (M)', 'Chemical-Resistant Lab Coat', 'Anti-Fog Safety Goggles'],
        icon: Pill, image: '/dna_rna_extraction.png',
      }
    ]
  },
  {
    id: 'liquid-handling-automation',
    title: 'Liquid Handling & Lab Automation',
    shortTitle: 'Liquid Handling',
    icon: Syringe,
    color: '#0EA5E9',
    image: '/life_sciences.png',
    overview: 'Electronic pipettes, robotic liquid handlers, and workflow automation solutions reducing error and increasing throughput.',
    workflows: [
      {
        title: 'Electronic Pipettes',
        description: 'Ergonomic electronic and motorised multichannel pipettes for repetitive pipetting tasks.',
        extendedDescription: 'Bluetooth-enabled electronic pipettes with programmable mixing, dispensing, and dilution modes that reduce RSI risk and improve CV% in liquid transfers from 0.1μL to 10mL.',
        keyFeatures: ['Single and multichannel formats', 'CV < 0.5% at nominal volume', 'Bluetooth data logging', 'GLP-compliant calibration records'],
        relatedProducts: ['Electronic Single-Channel Pipette', 'Electronic 12-Channel Pipette', 'Pipette Calibration System'],
        icon: Syringe, image: '/life_sciences.png',
      },
      {
        title: 'Robotic Liquid Handlers',
        description: 'Automated 96/384-well pipetting robots for NGS sample prep, ELISA, and drug discovery.',
        extendedDescription: 'Flexible robotic workstations with 8 to 384-channel pipetting heads delivering sub-microliter accuracy for genomics sample preparation, compound management, and high-throughput screening.',
        keyFeatures: ['8–384 channel simultaneous transfer', 'Sub-μL accuracy and precision', 'Integrated labware gripper', 'Method programming software'],
        relatedProducts: ['96-Channel Liquid Handling Robot', 'Compact 8-Channel Workstation', 'Automated Plate Sealer'],
        icon: Syringe, image: '/life_sciences.png',
      },
      {
        title: 'Automated Dispensers & Washers',
        description: 'Microplate washers, reagent dispensers, and automated strip handlers for ELISA workflows.',
        extendedDescription: 'High-throughput reagent dispensing and plate washing systems ensuring uniform coating, blocking, and washing in ELISA, cell-based, and bead-based assay workflows.',
        keyFeatures: ['Adjustable dispense volume 1–2000μL', '96/384-well compatible manifolds', 'Vacuum and positive-pressure wash', 'Protocol storage and recall'],
        relatedProducts: ['Microplate Washer (96/384-well)', 'Automated Reagent Dispenser', 'Automated Plate Stacker'],
        icon: Syringe, image: '/life_sciences.png',
      }
    ]
  },
  {
    id: 'lims-software',
    title: 'LIMS & Software',
    shortTitle: 'LIMS',
    icon: Monitor,
    color: '#7C3AED',
    image: '/biobanking_storage.png',
    overview: 'Laboratory information management systems, data management, and instrument connectivity software for modern labs.',
    workflows: [
      {
        title: 'Laboratory Information Management (LIMS)',
        description: 'Cloud and on-premise LIMS for sample tracking, test management, and result reporting.',
        extendedDescription: 'Scalable LIMS platforms managing the full sample lifecycle from accession to report, with integrated QC management, instrument interfacing, and 21 CFR Part 11 / GAMP 5 compliance.',
        keyFeatures: ['Full sample chain-of-custody', '21 CFR Part 11 compliant audit trail', 'Instrument bidirectional interfacing', 'Custom report and CoA generation'],
        relatedProducts: ['Cloud LIMS (SaaS)', 'On-Premise Enterprise LIMS', 'LIMS Implementation Service'],
        icon: Monitor, image: '/biobanking_storage.png',
      },
      {
        title: 'Instrument Data Management',
        description: 'Chromatography data systems, spectroscopy software, and multi-instrument data platforms.',
        extendedDescription: 'Unified instrument data management platforms integrating chromatography (CDS), spectroscopy, and qPCR data into a single compliant repository with electronic signatures and version control.',
        keyFeatures: ['Multi-vendor instrument support', 'Electronic laboratory notebook (ELN)', 'Automated data review rules', 'Cloud backup and disaster recovery'],
        relatedProducts: ['Chromatography Data System', 'Electronic Lab Notebook (ELN)', 'Scientific Data Management Platform'],
        icon: Monitor, image: '/biobanking_storage.png',
      },
      {
        title: 'Quality & Compliance Tools',
        description: 'QMS software, equipment qualification tools, and audit management systems.',
        extendedDescription: 'Integrated quality management software covering document control, CAPA, deviation management, equipment calibration scheduling, and supplier qualification for ISO 17025, ISO 15189, and GMP laboratories.',
        keyFeatures: ['Document and SOP control', 'CAPA and deviation tracking', 'Equipment calibration scheduler', 'ISO 17025 and GMP gap analysis'],
        relatedProducts: ['Quality Management System (QMS)', 'Calibration Management Software', 'Audit Preparation Toolkit'],
        icon: Monitor, image: '/biobanking_storage.png',
      }
    ]
  },
  {
    id: 'turnkey-lab-design',
    title: 'Turnkey Lab Design & Furniture',
    shortTitle: 'Lab Design',
    icon: Scale,
    color: '#D97706',
    image: '/life_sciences.png',
    overview: 'End-to-end laboratory design, modular furniture, fume hoods, and validated turnkey lab setup services.',
    workflows: [
      {
        title: 'Laboratory Planning & Design',
        description: 'Architectural design, workflow optimization, and 3D visualization for greenfield and refurbished labs.',
        extendedDescription: 'Complete laboratory design services starting from needs assessment, floor plan optimization, and 3D BIM modelling through to equipment layout, utilities planning, and regulatory-compliant design documentation.',
        keyFeatures: ['CAD and BIM 3D design', 'Workflow and space optimization', 'Regulatory compliance review', 'Utilities and HVAC planning'],
        relatedProducts: ['Lab Design Consultation Package', '3D BIM Lab Model', 'Regulatory Compliance Report'],
        icon: Scale, image: '/life_sciences.png',
      },
      {
        title: 'Modular Lab Furniture',
        description: 'Adjustable-height benches, storage systems, and island units for flexible laboratory spaces.',
        extendedDescription: 'Ergonomic and chemically resistant modular laboratory furniture systems including height-adjustable benches, overhead storage, under-bench cabinets, and mobile units that adapt to evolving lab needs.',
        keyFeatures: ['Chemical-resistant epoxy resin tops', 'Height-adjustable 680–1000mm', 'Modular and reconfigurable', 'Load-rated to 150 kg/linear meter'],
        relatedProducts: ['Height-Adjustable Lab Bench', 'Overhead Storage Cabinet', 'Mobile Trolley Unit'],
        icon: Scale, image: '/life_sciences.png',
      },
      {
        title: 'Fume Hoods & Containment',
        description: 'Ducted and ductless fume hoods, biosafety cabinets, and laminar flow units.',
        extendedDescription: 'Full range of containment equipment from conventional ducted fume cupboards to ductless carbon-filtered hoods and laminar flow clean benches designed to EN 14175 and NSF 49 standards.',
        keyFeatures: ['Variable air volume (VAV) control', 'Ductless activated carbon filter', 'Airflow monitoring and alarms', 'EN 14175 / NSF 49 certified'],
        relatedProducts: ['1.2m Ducted Fume Cupboard', 'Ductless Filtered Fume Hood', 'Laminar Flow Clean Bench'],
        icon: Scale, image: '/life_sciences.png',
      }
    ]
  },
  {
    id: 'service-management',
    title: 'Service Management',
    shortTitle: 'Services',
    icon: Settings,
    color: '#059669',
    image: '/pharma_biopharma.png',
    overview: 'Installation, qualification, calibration, preventive maintenance, and AMC services to keep your instruments operating at peak performance.',
    workflows: [
      {
        title: 'Installation & Qualification (IQ/OQ/PQ)',
        description: 'Validated instrument installation and operational qualification services for GMP and ISO labs.',
        extendedDescription: 'Factory and field-based IQ/OQ/PQ validation services ensuring instruments are installed correctly, operating within specification, and performing consistently in your specific laboratory environment and application.',
        keyFeatures: ['IQ, OQ, and PQ protocol execution', 'Deviation report and CAPA support', 'Electronic validation documentation', 'FDA/EU GMP compliant reports'],
        relatedProducts: ['IQ/OQ Validation Service', 'PQ Performance Qualification', 'Validation Documentation Package'],
        icon: Settings, image: '/pharma_biopharma.png',
      },
      {
        title: 'Calibration & NABL Testing',
        description: 'Traceable calibration services for pipettes, balances, centrifuges, and temperature devices.',
        extendedDescription: 'ISO/IEC 17025 accredited calibration services providing traceable certificates for laboratory instruments, ensuring metrological compliance and supporting regulatory inspections and audits.',
        keyFeatures: ['NABL-accredited calibration', 'Pipette and balance calibration', 'Temperature device verification', 'On-site and in-lab options'],
        relatedProducts: ['Pipette Calibration Service', 'Balance Calibration Certificate', 'Temperature Logger Verification'],
        icon: Settings, image: '/pharma_biopharma.png',
      },
      {
        title: 'Annual Maintenance Contracts (AMC)',
        description: 'Comprehensive preventive maintenance and emergency repair contracts for laboratory instruments.',
        extendedDescription: 'Flexible AMC packages covering scheduled preventive maintenance, parts replacement, emergency breakdown response, and application support to maximise instrument uptime and lifecycle value.',
        keyFeatures: ['Scheduled preventive maintenance visits', 'Priority emergency response (4–24hr)', 'Genuine OEM parts included', 'Application and method support'],
        relatedProducts: ['Comprehensive AMC Package', 'Preventive Maintenance Service', 'Emergency Repair Contract'],
        icon: Settings, image: '/pharma_biopharma.png',
      }
    ]
  }
];
