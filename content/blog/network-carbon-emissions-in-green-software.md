---
title: "Network Carbon Emissions in Green Software - How to quantify and keep actionable"
date: 2025-07-28
author: "Arne Tarara & David Kopp"
authorlink: "https://www.linkedin.com/in/arne-tarara/"
---

Green Software is all about making software emit less carbon emissions. Most parts of that can be directly quantified
as the compute, storage, memory etc. are physically accessible.

A big unknown and supposedly big contributor to carbon emissions of IT however is the network traffic.
Since we built the internet to be hyper decentralised and routing packages in the internet is a beast of it's own no
one can guarantee you if a package from Berlin to Amsterdam will go more or lest directly or take a detour via Belgium, 
or even through Poland and Denmark.

Also you do not know which hardware is used along the way to repeat the signal and route it accordingly.

Academia has looked at this problem in the past through different approaches and this blog article shall analyse
which of these models is most useful for Green Software Practicioners.

Ready for a ride? Let's dive in! (we tried out a new short and bullet point format which we believe is nice to read. leave us your feedback how you like it via [mailto:arne@green-coding.io](arne@green-coding.io))

---

## Should tools display network emissions at all?

Yes, because:

- Network data transfers are relevant and account for approximately 23% of GHG emissions in the ICT sector.  
  *(Source: Green IT Association 2025 – [https://t.ly/greeniteco.IENM2025](https://t.ly/greeniteco.IENM2025))*
- It is important to make the impact of network data transfers visible.

<br>

## Which Calculation Methodologies Are Available?

Two main methodologies are used to estimate network emissions:

- **Energy Intensity Model**
- **Power Model**

<br><br>

### Energy Intensity Model

**Description:**

- Based on the volume of data transferred (e.g., kWh/GB or total kWh)
- Allows allocation of emissions based on the amount of data consumed

<br>

**Strengths:**

- Can be used for attributional reasoning
  - e.g., within an organization: "Department X is responsible for Y% of network emissions"
- Enables identification of main drivers
- Strongly incentivizes data volume reduction, which is beneficial even without precise quantification:
  - **Direct:** Less data processing required
  - **Indirect:**
    - Less load during peak times of the network infrastructure ensures that further expansion of the network infrastructure is slowed down (good in terms of operational and embodied emissions)
    - Avoiding bloatware leads to longer end user device lifespan

<br>

**Problems:**

- Network infrastructure energy use does not scale proportionally with data volume
- Global average values ignore context:
  - Physical distance between client and server
  - Geographic location (and local grid CO₂ intensity)
  - Transmission type (DSL, Wi-Fi, mobile, satellite, etc.)

<br>

**Consequences:**

- Not suitable for detailed analysis
  - Creates misleading impression that more data always equals more energy
- Not usable for consequential reasoning
  - Example: halving the data would misleadingly suggest halved emissions
- Only reliable if total data volume and infrastructure energy consumption are known

<br>

**References:**

- Seeliger et al. (2024)  
- Guennebaud & Bugeau (2024)

<br><br>

### Power Model

**Description:**

- Recognizes that energy consumption is time-dependent and occurs even when idle
- Assumes high base-load consumption in distribution networks
- Total energy = fixed idle load + variable load proportional to data

<br>

**Strengths:**

- More accurately reflects current real-world conditions
- Enables analysis of short-term energy impacts when content is transmitted to end-users

<br>

**Problems:**

- Actual network usage duration can only be captured in production, not in isolated lab environments
- Sensitive to the power ratings of network equipment, which must be accurate

<br>

**References:**

- Seeliger et al. (2024)  
- Mytton, Lundén & Malmodin (2024)


<br><br>


## Which energy intensity values should be used in 2025?

### Tool Comparison

| **Tool**                  | **Constant (Wh/GB)** | **Comments**                                                                                                                      | **Source**                                                                   |
|-----------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
|-----------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **GMT (current)**     | 1.875            | Extrapolated from Aslan et al. (2018), using 0.06 kWh/GB for 2015                                                             |                                                                           |
| **SWDM v4 (CO2.js)**  | 72               | Includes operational and embodied emissions<br>End-user devices: 161, Network: 72, Data center: 67                           | [Sustainable Web Design](https://sustainablewebdesign.org/estimating-digital-emissions/) |
| **Cardamon**          | 59               |                                                                                                                               | [Cardamon GitHub](https://github.com/Root-Branch/cardamon-web-model)     |
| **GreenFrame**        | 11               |                                                                                                                               | [GreenFrame README](https://github.com/marmelab/greenframe-cli/blob/main/src/model/README.md) |
| **Greenspector Studio** | ?              | Uses proprietary model based on multiple parameters                                                                           |  [Greenspector's Methodology](https://greenspector.com/wp-content/uploads/2025/05/Methodology_Greenspector_full_EN-Version-202405.pdf)                                                                         |

### Study-Based Estimates

**Aslan et al. (2018):**

- **System boundary**: core and fixed-line networks (but likely only WAN according to Coroamă)
- **Trend**: Energy intensity halves every ~2 years
    - 2015: 0.06 kWh/GB → extrapolated 2025: ~0.001875 kWh/GB
- Large discrepancy when compared with overall WAN energy estimates using Cisco data
- **Limitations:**
  - Does not include access networks (FAN, RAN)
  - Coroamă (2021): bottom-up models often underestimate due to system complexity

**Coroamă (2021):**

- **System boundary** includes WAN + FAN + RAN
- 2020 values:
  - WAN: 0.02 kWh/GB  
  - FAN: 0.07 kWh/GB  
  - RAN: 0.2 kWh/GB
- Reduction trends (yearly energy intensity reduction factor):
  - WAN: 0.8  
  - FAN: 0.85  
  - RAN: 0.8
- Extrapolated 2025 values:
  - WAN: 0.0065536 kWh/GB 
  - FAN: 0.031059372 kWh/GB 
  - RAN: 0.065536 kWh/GB 

## Which network segments should be included?

<img class="ui huge rounded bordered image" src="/img/blog/boundaries_network_emissions_coroma.webp">

Studies define different system boundaries. Coroamă (2021) includes:

- **WAN (Wide Area Network)**: includes core and metro
- **FAN (Fixed Access Network)**: includes DSLAM, CPE (modems, routers)
- **RAN (Radio Access Network)**: mobile networks

**Important notes:**

- CPE energy use can exceed WAN energy use
- RAN is significantly more energy-intensive per GB than WAN

**GMT capabilities:**

- GMT can measure backend and frontend systems (e.g., via headless browser)
- However, including all segments for purely backend systems (e.g., DC-to-DC transfers) would exaggerate network share

**Example calculation (1 GB data transfer, 2020, Coroamă coefficients):**

- **Only WAN:** 0.02 kWh  
- **WAN + 50% FAN + 50% RAN:** 0.02 + 0.07/2 + 0.2/2 = 0.155 kWh  
  → 7.75× higher  
- **Mobile-only usage:** 0.02 + 0.2 = 0.22 kWh → 11× higher

## Should the SCI score include network emissions?

Modern software carbon emissions measurement tools often use the SCI by the Green Software Foundation.

It is thus to be reasoned wether network carbon emissions should be included in the SCI or not.

**SCI Spec Quote:**

> The calculation of SCI shall include all supporting infrastructure and systems that significantly contribute to the software’s operation.

**Pro:**

- Network usage can be significant → inclusion is justifiable

**Contra:**

- The kWh/GB method isn't valid for consequential reasoning
  - An application version change affecting only data volume may misleadingly reduce the SCI score → could wrongly imply a reduction in carbon footprint

**Verdict:**
We think the network emissions calculated via the kWh/GB method should **not** be included in the SCI score.



## Conclusion for Green Software Practicioners

We believe that the *Energy Intensity Model* is the most helpful when making network carbon emissions visible and
keeping them actionable to make software greener.

A possible setup for a measurement tool, that we for instance used in the [Green Metrics Tool](https://www.green-coding.io/products/green-metrics-tool/)
is that we selected the scope to contain WAN+RAN+FAN and assumed that FAN makes up about 10% of the connection types
while FAN makes up 90%. (Keep in mind that mobile connections that come via WLAN are still considered FAN).

---

## References

Aslan, J. _et al._ (2018) ‘Electricity Intensity of Internet Data Transmission: Untangling the Estimates’, _Journal of Industrial Ecology_, 22(4), pp. 785–798. Available at: https://doi.org/10.1111/jiec.12630

Coroama, V. (2021) _Investigating the inconsistencies among energy and energy intensity estimates of the internet_. Swiss Federal Office of Energy SFOE. Available at: https://vs.inf.ethz.ch/publ/papers/Coroama2021_InternetEnergy.pdf

Guennebaud, G. and Bugeau, A. (2024) ‘Energy consumption of data transfer: intensity indicators versus absolute estimates’, _Journal of Industrial Ecology_, 28(4), pp. 996–1008. Available at: [https://doi.org/10.1111/jiec.13513](https://doi.org/10.1111/jiec.13513).

Green IT Association (2025). Environmental impacts of digital technology in the world, third edition, Available at: https://t.ly/greeniteco.IENM2025 

Mytton, D., Lundén, D. and Malmodin, J. (2024) ‘Network energy use not directly proportional to data volume: the power model approach for more reliable network energy consumption calculations’, _Journal of Industrial Ecology_. Available at: https://doi.org/10.1111/jiec.13512

Seeliger, R. et al. (2024) _Green Streaming - Guidelines on Evaluating the Energy Consumption and Reducing the CO2 Emissions of Video Streaming_. Berlin: Fraunhofer FOKUS. Available at: https://www.fokus.fraunhofer.de/content/dam/fokus/dokumente/fame/studien-paper/FAME_Greenstreaming_Whitepaper_2024-10_en.pdf
