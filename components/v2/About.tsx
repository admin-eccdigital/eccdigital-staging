"use client"
import { CountUp, CheckIcon, SparkIcon, Reveal } from "./shared"

export function About() {
  return (
    <section id="o-nas" className="light light--first">
      <div className="light-dots" />
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <div className="about-copy">
              <div className="eyebrow">
                <span className="num">01</span>
                <span className="dot" />
                Kdo jsme
              </div>
              <h2 className="h2">
                Strategický partner, ne dodavatel <span className="accent">izolovaných služeb.</span>
              </h2>
              <p className="lead-light">
                ECC Digital je česká digitální agentura, která od roku 2015 řídí kompletní digitální projekty pro
                středně velké B2B firmy. Neprodáváme jednotlivé služby — staráme se o strategii, výkon i provoz pod
                jednou střechou.
              </p>
              <ul className="about-list">
                <li>
                  <span className="abi">
                    <CheckIcon />
                  </span>
                  <div>
                    <strong>Komplexní přístup.</strong> Strategie, výkon, web a analytika navzájem propojené.
                  </div>
                </li>
                <li>
                  <span className="abi">
                    <CheckIcon />
                  </span>
                  <div>
                    <strong>Začínáme auditem nebo konzultací.</strong> Než cokoli slíbíme, podíváme se, kde jste.
                  </div>
                </li>
                <li>
                  <span className="abi">
                    <SparkIcon />
                  </span>
                  <div>
                    <strong>Aktivně využíváme AI.</strong> Claude, ChatGPT, Gemini a další — držíme krok s rychle se
                    měnícím prostředím.
                  </div>
                </li>
                <li>
                  <span className="abi">
                    <CheckIcon />
                  </span>
                  <div>
                    <strong>Dlouhodobá partnerství.</strong> Naši klienti s námi pracují v průměru 6 let.
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="about-stats">
              <div className="astat astat--hero">
                <div className="astat-eyebrow">Průměrná délka spolupráce</div>
                <div className="astat-num astat-num--xl">
                  <CountUp end={6} />
                  <span> let</span>
                </div>
                <div className="astat-bar">
                  <span style={{ width: "86%" }} />
                </div>
                <div className="astat-lbl">
                  Klienti, kteří s námi zůstávají roky — ne kampaně, ale partnerství.
                </div>
              </div>
              <div className="astat astat--row">
                <div className="astat-cell">
                  <div className="astat-num">
                    <CountUp end={10} />
                    <span>+</span>
                  </div>
                  <div className="astat-lbl">let na trhu</div>
                </div>
                <div className="astat-cell">
                  <div className="astat-num">
                    <CountUp end={300} />
                    <span>+</span>
                  </div>
                  <div className="astat-lbl">projektů</div>
                </div>
                <div className="astat-cell">
                  <div className="astat-num">
                    <CountUp end={150} />
                    <span>+</span>
                  </div>
                  <div className="astat-lbl">webů pod správou</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
