---
title: "How to Measure and Act on Network Carbon Emissions in Green Software"
date: 2025-08-05
author: "Arne Tarara & David Kopp"
authorlink: "https://www.linkedin.com/in/arne-tarara/"
socialmedia_preview: "/img/blog/social/network-carbon-emissions.webp"
---

We have gotten pretty good at measuring the emissions from things like computing, storage and memory usage, because the hardware is right in front of us. But when it comes to network traffic, things get murky.

## So what is the carbon footprint of sending a cat meme?

The internet is a tangled web of cables, routers, and towers and your data might take a wildly unpredictable route from Berlin to Amsterdam (via Belgium, Poland or Denmark).

Basically, we often can’t know the exact path or what networking hardware is used along the way, which makes it difficult to know how much energy is really being used. Academia has looked at this problem in the past through different approaches and this blog article shall analyse which of these models is most useful for Green Software Practitioners.

We’ll compare two main methodologies (energy intensity vs. power-based models), discuss which data inputs make sense in 2025, consider system boundaries (which parts of the network to include), and address whether metrics like the Software Carbon Intensity (SCI) score should incorporate network emissions.

Ready for a ride? Let's dive in! (We tried out a new short and bullet point format which we believe is nice to read. Leave us your feedback how you like it via [arne@green-coding.io](mailto:arne@green-coding.io))

---

{{< greenblock >}}
Preface
{{</ greenblock >}}

## Should tools display network emissions at all?

Yes, because:

- Network data transfers should be measured and made visible because omitting them would ignore roughly 23% of the GHG emissions caused by the ICT sector. (Source: Green IT Association 2025)
- It is important to make the impact of network data transfers visible so that we know how to steer the ship.


## Which Calculation Methodologies Are Available?

Two main methodologies are used to estimate network emissions:

- **Energy Intensity Model**: Estimates emissions based on data valume using factors like kilowatt-hours per gigabyte (kWh/GB)
- **Power Model**: Acconts for the constant energy use of network hardware over time, even when idle, making them less tied to data valume.

Now we will break down how each model works, including their pros and cons, and see which one offers more actionable insights greener software.

<br>

{{< whiteblock >}}
Energy Intensity Model
{{</ whiteblock >}}

This approach is based on the volume of data transferred, such as kilowatt-hours per gigabyte (kWh/GB) or total kilowatt-hours (kWh), and allows for the allocation of emissions according to the amount of data consumed.

So if that cat meme we have been dying to send is 1MB and the network intensity is 5 Wh/GB, sending 1,000 memes would cost about 5 Wh. The factor can include just operational energy (e.g. routers, switches, towers) or also embodied infrastructure energy (depending on the scope), and can be converted to CO₂ using a grid emissions factor (global or region-specific).

**Strengths:**

- **Clear attribution**
  - e.g., within an organization: "Team A’s cat meme uploads used 500 GB last month = X kWh and Y kg CO₂", helping teams see who's using the most bandwidth and why
- **Simple and Actionable**  
  Just data x factor. Once you know that more **memes = more emissions**, it becomes obvious where to cut waste (like oversized images or uncompressed videos).
- **Enables teams to spot the "big offenders"**  
  By measuring impact per GB, it helps teams identify the real data hogs like an autoplaying cat video feed so they know where to optimise (e.g., compress, cache, or cut).
- **Drives Efficiency Wins**  
  Sending less data reduces energy use directly (servers, devices) and indirectly (less pressure on network infrastructure). Cutting back during peak times can delay costly expansions like new routers or base stations, avoiding extra operational and embodied emissions.

**Challenges:**

- **Network infrastructure energy use does not scale proportionally with data volume**
  - e.g., this means that Internet hardware (routers, towers) stay powered on even when no cat memes are being sent. So sending one extra meme at midnight might use almost no extra energy, while sending it during peak hours could strain the network and trigger more energy use. The "per GB" model does not capture this non-linearity.
- **Global average values ignore context**
  - Physical distance between client and server
  - Geographic location (and local grid CO₂ intensity)
  - Transmission type (DSL, Wi-Fi, mobile, satellite, etc.)

**Limitations:**

- **Misleading for Change**  
  If your app compresses memes, the model might claim "50% less energy!" But unless the underlying hardware powers down, the real savings are much smaller. It also assumes doubling meme traffic doubles emissions, which isn’t true when networks are under capacity.
- **Accuracy Depends on Data**  
  Without knowing total network energy and traffic, the numbers are just rough guesses. If some parts of the system (like mobile towers) are left out, emissions are underestimated.

---

**Summary**:  
The “energy per meme” model is **easy to use** and **great for quick insights**. It helps teams cut waste and track emissions by linking data volume to energy use.  
But it **oversimplifies reality**, ignoring how networks actually consume energy.

**Bottom line**:  
A useful **starting point** for action — not a precise measurement tool.

{{< greenblock >}}
Power Model (Time-Dependent / Load-Based)
{{</ greenblock >}}

Unlike the energy intensity model, the **power model** focuses on how long network devices are running and how much load they handle — not just how much data is transferred.

For example:  
Your router uses energy just to stay on (even when no cat memes are being sent). That’s **idle power**. When you send memes, it draws more power depending on **how much data** and **for how long**.

- Sending one cat meme quickly may use (a little) more power for a short time.  
- Sending it slowly may use less power over a longer period.

*Total energy might be similar — what matters is **power × time**, not just bytes.*

To apply this model, you need data on device energy at rest and under load — something researchers are now starting to measure.

**Strengths:**

- **Matches How Networks Actually Work**:  
  Captures the fact that **a lot of energy is spent just keeping the network running**, even when no memes are being sent.  
  This means it can more **accurately estimate the energy impact** of a data transfer — especially short bursts.  
  Example: One small meme may have near-zero incremental energy if the network is already running.
- **Enables Operational Insights**:  
  Helps answer real-world scaling questions like:  
  *“What happens if 100,000 users send memes at once?”*  
  Useful during traffic spikes, rollouts, livestreams, etc.
- **Reflects Current Network Design**:  
  Networks are designed for **peak load**, staying powered on constantly.  
  The power model separates **fixed baseline energy** from **variable traffic-driven energy**, encouraging smarter management (e.g., sleep modes).

**Challenges:**

- **Data Requirements**  
  Needs idle and active power data for networking hardware, which is often proprietary or unpublished.
- **Temporal Sensitivity**  
  Accurate modeling depends on knowing when and how long data flows occur — difficult to capture in typical software environments.
- **Model Calibration**  
  Requires validation against real-world network measurements, which are rarely available outside research or telecom settings.
- **Maintenance Overhead**  
  Hardware, protocols, and network loads evolve — meaning models must be regularly updated to stay relevant.

**Limitations:**

- **Limited Applicability**
  Power model results are context-specific and don't easily generalize across networks, locations, or user bases.
- **Opaque Infrastructure**  
  Software teams typically can't see or influence how the underlying network operates, limiting the model’s practical impact.
- **Low Relevance at Small Scale**  
  For small data transfers or low-traffic apps, energy differences are negligible — the model adds complexity without value.
- **Tooling Complexity**  
  Too intricate for routine use in developer tools, CI pipelines, or product-level carbon reporting.

---

**Summary**:  
Power models offer a **more accurate, real-time picture** of network energy. They show the **nonlinear relationship** between data and emissions, challenging the “more bytes = more energy” logic.
However they are also **more complex**.  

As **David Mytton et al. (2024)** show, they can correct major mistakes in simpler models — but only if you're willing to put in the work.

**Bottom line:**
The power model offers high fidelity but is best suited for researchers or network operators, not day-to-day software teams.


{{< whiteblock >}}
Which energy intensity values should be used?
{{</ whiteblock >}}

Even within the energy intensity approach, the assumed factor (Wh per GB) can vary wildly. Different tools and studies quote very different numbers for network energy per data, depending on scope and methodology. Let’s compare a few notable ones:

### Tool Comparison

| **Tool**                | **Constant (Wh/GB)** | **Comments**                                                                                                                                                                       | **Source**                                                                                                                            |
|-------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| ----------------------- | ------------------   | --------------------------------------------------------------------------------------------------                                                                                 | ---------------------------------------------------------------------------                                                           |
| **GMT**                 | 1.875                | Extrapolated from Aslan et al. (2018), using 0.06 kWh/GB for 2015.<br>For updated value see <a href="https://www.green-coding.io/co2-formulas/#gigabytes-to-kwh">CO2 Formulas</a>. |                                                                                                                                       |
| **SWDM v4 (CO2.js)**    | 72                   | Includes operational and embodied emissions<br>End-user devices: 161, Network: 72, Data center: 67                                                                                 | [Sustainable Web Design](https://sustainablewebdesign.org/estimating-digital-emissions/)                                              |
| **Cardamon**            | 59                   |                                                                                                                                                                                    | [Cardamon GitHub](https://github.com/Root-Branch/cardamon-web-model)                                                                  |
| **GreenFrame**          | 11                   |                                                                                                                                                                                    | [GreenFrame README](https://github.com/marmelab/greenframe-cli/blob/main/src/model/README.md)                                         |
| **Greenspector Studio** | ?                    | Uses proprietary model based on multiple parameters                                                                                                                                | [Greenspector's Methodology](https://greenspector.com/wp-content/uploads/2025/05/Methodology_Greenspector_full_EN-Version-202405.pdf) |

#### Why do Network Energy Estimates vary so much?

Estimates range from under **2 Wh/GB** to over **70 Wh/GB** — that’s a **40× difference**! Why? It depends on what’s included in the calculation!  
**System boundaries vary**. Some models only include core networks, while others factor in access networks, end-user devices, and even manufacturing.

**Low estimates (e.g. GMT ~1.9 Wh/GB):**

- Based on a **bottom-up** estimation.
- Extrapolated value for 2025 from **Aslan et al.** on fixed-line networks (i.e. does not include end-user networking equipment).
- **Operational-only**: does not include embodied emissions.

**High estimates (e.g. CO2.js at 72 Wh/GB, Cardamon at 59 Wh/GB):**

- Based on a **top-down** estimation.
- Include **everything**: core + access networks (including end-user networking equipment), and embodied carbon (e.g. emissions from manufacturing hardware).
- Designed to capture the **full lifecycle impact**.

### Research-Based Estimates

**Aslan et al. (2018):**

- Found relative low energy use (`0.06 kWh/GB` for 2015) for moving data through the core Internet.
- Rule: the electricity intensity of network transfer decreases by half approximately every two years.
- Did not include mobile networks, home routers or Wi-Fi.
- Useful for **best-case scenarios**, but **hugely underestimates** total Internet energy use — by 5 to 25×.

**Coroamă (2021):**

- Broke down the Internet into:
  - **WAN (core backbone)**: very efficient (`0.02 kWh/GB` for 2020)
  - **FAN (home routers/local networks)**: medium use (`0.07 kWh/GB`)
  - **RAN (mobile networks)**: most energy-hungry (`0.2 kWh/GB`)
- Sending 1 GB over mobile can use **30× more energy** than over fiber.
- Predicted **mobile data** will remain most energy-intensive by 2025.

**Guennebaud & Bugeau (2024):**

- Warned against relying on "average energy per GB".
- Argued we need more **context** — like **when** and **how** data is sent — for accuracy.

**Mytton, Lundén & Malmodin (2024):**

- Highlights that networks consume energy just to **stay on**, even when idle.
- Data reduction doesn’t always mean energy reduction — especially short-term.
- Recommends using the power model.

**Seeliger et al. (2024):**

- Wrote a guide on measuring emissions from **video streaming**.
- Provides a good overview of the topic and compares the different estimation models.

<br>

## Which Network Segments Should Be Included?

When calculating network emissions for your software, define your system boundary. Here's a breakdown:

- **WAN (Wide Area Network)**: Core of the internet — long-distance links and routers. Low and decreasing energy per GB. Some tools only include WAN.
- **FAN (Fixed Access Network)**: "Last mile" to users — local ISPs, fiber/cable, Wi-Fi routers.
- **RAN (Radio Access Network)**: Mobile networks — **most energy-hungry**. Should be included for mobile-first apps.

**Important Notes:**

- **CPE energy use can exceed WAN energy use**. (CPE = customer premises networking equipment)
- **RAN is 10–30× more energy-intensive per GB** than WAN.

**GMT Capabilities:**

- Measures **backend and frontend systems**.
- For **backend-only** activity (e.g., data center to data center), including user networks **overstates emissions**.

**Example Calculation (1 GB transfer, Coroamă, 2020):**

- Only WAN: `0.02 kWh`
- WAN + 50% FAN + 50% RAN: `0.155 kWh` → **7.75× higher**
- Mobile-only usage: `0.22 kWh` → **11× higher**

### So What Segments Should You Include?

Include the segments that significantly contribute to your software’s operation.

- If mobile-first: include **RAN + FAN**
- If enterprise on wired networks: **FAN only**
- Always include **WAN**

The **Green Software Foundation's SCI** standard says to include **any infrastructure that meaningfully supports your software**.

In GMT, we assume:

- **90% fixed (FAN)**, **10% mobile (RAN)**
- Always include **WAN**

**Reminder**: Wi-Fi is part of **FAN**, not RAN (So even if users are on phones, they are often using fixed-line networks when on Wi-Fi).

But if you're measuring backend-only activity—like server-to-server transfers in a data center—then including access networks (FAN/RAN) would overestimate emissions. Context matters. Define your boundary based on how your software is actually used.

{{< greenblock >}}
Use Case: Cutting Carbon from Cat Videos
{{</ greenblock >}}

A streaming platform notices heavy mobile viewing of HD cat videos. They want to reduce network emissions.

### Step 1: Measure

- 1 hr at 1080p = ~3 GB
- `3 GB × 50 Wh/GB = 150 Wh = 75g CO₂`

### Step 2: Act

- Lower quality to 720p (~1.8 GB/hr)
- `1.8 GB × 50 Wh/GB = 90 Wh = 45g CO₂`
- **40% energy savings**

### Step 3: Reality Check (Power Model)

- Network gear stays on regardless of data size.
- One user switching has little effect.
- But **millions** switching = **fewer upgrades**, less energy.

### Step 4: Results

- **35% lower data per user**
- **Fewer network peaks**
- **ISP defers hardware upgrade** → less embodied carbon


--- 

 **Takeaway**:

- **Energy Intensity model**: fast insights, actionability
- **Power Model**: realistic scale-aware checks


{{< whiteblock >}}
Should Network Emissions Count Toward SCI?
{{</ whiteblock >}}

GMT can calculate the SCI score for a given use case scenario.  
Should estimated network impacts be included in the SCI score?

**Pro (Include):**

- Network is a major emissions source in some apps.
- Avoids blind spots and burden shifting.
- Aligns with SCI's principles.

**Con (Exclude or Treat Carefully):**

- **Simplistic methods distort** outcomes.
- Might incentivize data savings that **don’t cut real emissions**.
- Unfair comparisons: Wi-Fi vs. mobile.
- Hard to verify: ISP data is opaque.

**Verdict:**

Don't include **network emissions** (via kWh/GB) in the **SCI score** as it is too simplistic and can give a false sense of precision, mislead optimisation efforts, and make scores hard to compare.
Use them as a **separate diagnostic** for awareness and improvement.

{{< greenblock >}}
Conclusion & Recommendations for Practitioners
{{</ greenblock >}}

### Why Energy Intensity (kWh/GB) Works Well

- **Simple**: Just multiply your data volume.
- **Tool-friendly**: Easy to add to dashboards or pipelines.
- **Concrete**: “This stream = 90g CO₂” → motivates teams

### Why Power Model is Valuable (but Complex)

- **More accurate**, but:
  - Requires **hardware data**
  - Non-linear: network stays “on”
  - Best for **deep research or ISPs**

### Bottom Line

Use **Energy Intensity (kWh/GB)** as a **starting point** to raise awareness, prioritize efficiency, and track progress.
Use the **Power Model** if you’re doing advanced research or want to model real-world network behavior more precisely.

Think of energy intensity as a compass — not a precise GPS, but enough to steer in the right direction.

<br>

---

<br>

## References

Aslan, J. _et al._ (2018) ‘Electricity Intensity of Internet Data Transmission: Untangling the Estimates’, _Journal of Industrial Ecology_, 22(4), pp. 785–798. Available at: <https://doi.org/10.1111/jiec.12630>

Coroama, V. (2021) _Investigating the inconsistencies among energy and energy intensity estimates of the internet_. Swiss Federal Office of Energy SFOE. Available at: <https://vs.inf.ethz.ch/publ/papers/Coroama2021_InternetEnergy.pdf>

Guennebaud, G. and Bugeau, A. (2024) ‘Energy consumption of data transfer: intensity indicators versus absolute estimates’, _Journal of Industrial Ecology_, 28(4), pp. 996–1008. Available at: <https://doi.org/10.1111/jiec.13513>.

Green IT Association (2025). Environmental impacts of digital technology in the world, third edition, Available at: <https://t.ly/greeniteco.IENM2025> 

Mytton, D., Lundén, D. and Malmodin, J. (2024) ‘Network energy use not directly proportional to data volume: the power model approach for more reliable network energy consumption calculations’, _Journal of Industrial Ecology_. Available at: <https://doi.org/10.1111/jiec.13512>

Seeliger, R. et al. (2024) _Green Streaming - Guidelines on Evaluating the Energy Consumption and Reducing the CO2 Emissions of Video Streaming_. Berlin: Fraunhofer FOKUS. Available at: <https://www.fokus.fraunhofer.de/content/dam/fokus/dokumente/fame/studien-paper/FAME_Greenstreaming_Whitepaper_2024-10_en.pdf>
