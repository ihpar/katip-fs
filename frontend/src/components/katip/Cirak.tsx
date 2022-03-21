import "./Cirak.scss";

const Cirak = () => {
  return (
    <div className="no-print">
      <div className="assistant accordion-wrapper">
        <div className="assistant-title">
          <span className="i-sharp assistant-title-icon">assistant</span>
          Çırak
        </div>
        <div className="assistant-body">
          <div className="search-section">
            <input type="text" className="txt-input" placeholder="Ara..." />
            <span className="i-sharp search-icon">search</span>
            <br />
            <div className="text-underline"></div>
          </div>
          <div className="content-scroller info-section">
            Rast çıkıcı bir makamdır. Durağı Sol sesi, güçlüsü beşinci derecesindeki Re sesidir.
            <br />
            <br />
            Dizisi şu şekildedir: Sol, La, Si (koma bemol), Do, Re, Mi, Fa (bakiye diyez) ve Sol.
            <br />
            <br />
            Perdelerin Türk Müziği'ndeki isimleri şöyledir: Râst, Dügâh, Segâh, Çârgâh, Nevâ, Hüseynî, Evic, Gerdâniye.
            <br />
            <br />
            Rast makamına durak sesinden başlanır, ya durakta veya güçlüde asma karar yapılır sonra tizdeki dörtlüsünde
            de gezinildikten sonra durak sesi olan Sol ile karar verilir.
            <br />
            <br />
            Rast makamı, Klasik Türk müziğinin en temel makamı sayılır nitekim "rast" Farsça'da düz, doğru, sağ manasına
            gelir. Uzaktan andırsa da, batı müziğinde başka seslerin kullanılmasından dolayı majör gamlarıyla
            karşılaştırmak yanlıştır.
          </div>
          <a
            className="assistant-link"
            target="_blank"
            rel="noreferrer"
            href="https://tr.wikipedia.org/wiki/Rast_(makam)"
          >
            Devamı...
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cirak;
