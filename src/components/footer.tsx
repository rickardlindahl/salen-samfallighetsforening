const supportEmail = "rickard@lindahl.app";

export default function Footer() {
  return (
    <footer className="footer rounded-lg bg-white p-10">
      <div>
        <h4 className="text-base font-bold">Salen samfällighetsförening</h4>
      </div>
      <div>
        <span className="footer-title">Länkar</span>
        {[
          {
            text: "Umeå Energi driftinfo",
            key: "umea-energi",
            href: "https://driftinfo.umeaenergi.se/",
          },
          {
            text: "Återvinningscentralernas öppettider",
            key: "vakin-oppettider",
            href: "https://www.vakin.se/tjansterochabonnemang/lamnaavfall/oppettider.4.682b00ae16206de094712b0e.htmder",
          },
        ].map(({ text, key, href }) => (
          <a key={key} className="link-hover link" href={href} target="_blank" rel="noreferrer">
            {text}
          </a>
        ))}
      </div>
      <div>
        <span className="footer-title">Ser något fel ut?</span>
        <a
          className="link-hover link"
          href={`mailto:${supportEmail}?subject=${encodeURIComponent(
            "Buggrapport Salen samfällighetsförening",
          )}&body=${"Hej! Jag skulle vilja rapportera en bugg på hemsidan."}`}
        >
          Rapportera en bugg
        </a>
      </div>
    </footer>
  );
}
