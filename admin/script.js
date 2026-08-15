// ═══════════════════════════════════════════
// DATA STORE (localStorage)
// ═══════════════════════════════════════════
const LS_KEY = 'hondvo_admin';

// 删除按钮内联样式硬注入（方案 A：描边幽灵红，hover 才显色；避免 CSS 缓存/冲突导致裸奔）
const _HP_DEL_BTN_STYLE = `background:#fff;color:#A32D2D;border:1px solid #A32D2D;padding:9px 18px;border-radius:10px;font-weight:500;font-size:13px;cursor:pointer;transition:all .15s cubic-bezier(.4,0,.2,1);font-family:inherit;flex-shrink:0;line-height:1.2;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;`;

function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) { /* 本地数据损坏时回退默认，避免脚本崩溃 */ }
  return null;
}
let _currentPage = 'dashboard';
function saveData(markUnpublished) {
  if (markUnpublished !== false) DB.hasUnpublished = true;
  localStorage.setItem(LS_KEY, JSON.stringify(DB));
  updatePublishPanel();
}

const DEFAULT_DB = {
  products: [
    {id:1,name:'肠内营养输注系统',cat:'core',image:'images/prod_enteral.webp',desc:'专为肠内营养输注设计的II类无源医疗器械注塑组件，集成精密流体通道与密封结构',specs:'分类:II类医疗器械|应用:肠内营养输注|认证:ISO 13485',status:'published'},
    {id:2,name:'注射给药系统',cat:'core',image:'images/prod_injection.webp',desc:'高精度注射给药系统组件，满足药物输送的严格生物相容性要求',specs:'分类:II类医疗器械|应用:药物注射输送|认证:ISO 13485',status:'published'},
    {id:3,name:'其他II类医疗器械组件',cat:'core',image:'images/prod_custom.webp',desc:'提供各类II类无源医疗器械注塑组件的定制化开发与生产服务',specs:'分类:II类医疗器械|应用:定制化开发|认证:ISO 13485',status:'published'},
    {id:4,name:'LSR阀门',cat:'LSR',image:'images/ph_lsr.svg',desc:'液态硅胶精密阀门组件，适用于医疗器械流体控制',specs:'材质:LSR|标签:液态硅胶、医疗级',status:'published'},
    {id:5,name:'密封垫片',cat:'LSR',image:'images/ph_lsr.svg',desc:'LSR密封垫片，优异的耐温性和生物相容性',specs:'材质:LSR|标签:液态硅胶、密封件',status:'published'},
    {id:6,name:'导管尖端',cat:'LSR',image:'images/ph_lsr.svg',desc:'医用级LSR导管尖端，精密成型',specs:'材质:LSR|标签:液态硅胶、医疗级',status:'published'},
    {id:7,name:'微流道板',cat:'LSR',image:'images/ph_lsr.svg',desc:'LSR微流道板，适用于微流体控制场景',specs:'材质:LSR|标签:液态硅胶、微流控',status:'published'},
    {id:8,name:'精密齿轮',cat:'PP',image:'images/ph_pp.svg',desc:'高精度PP注塑齿轮，适用于医疗器械传动系统',specs:'材质:PP|标签:聚丙烯、齿轮',status:'published'},
    {id:9,name:'医疗外壳',cat:'PP',image:'images/ph_pp.svg',desc:'PP医疗设备外壳注塑，满足医疗级外观与强度要求',specs:'材质:PP|标签:聚丙烯、医疗级',status:'published'},
    {id:10,name:'IVD试剂盒',cat:'PP',image:'images/ph_pp.svg',desc:'PP材质IVD试剂盒，适用于体外诊断场景',specs:'材质:PP|标签:聚丙烯、IVD',status:'published'},
    {id:11,name:'鲁尔接头',cat:'PP',image:'images/ph_pp.svg',desc:'PP鲁尔接头，医疗流体连接标准接口',specs:'材质:PP|标签:聚丙烯、医疗级',status:'published'},
    {id:12,name:'双色手柄',cat:'2K',image:'images/ph_2k.svg',desc:'双射注塑包胶手柄，软硬一体成型',specs:'材质:PP+TPE|工艺:双色注塑|标签:双色、包胶',status:'published'},
    {id:13,name:'多色按钮',cat:'2K',image:'images/ph_2k.svg',desc:'多色注塑按钮，满足标识与触感双重需求',specs:'材质:多材质|工艺:多色注塑|标签:多色、精密',status:'published'},
    {id:14,name:'软硬包胶件',cat:'2K',image:'images/ph_2k.svg',desc:'软硬一体包胶组件，提供优异的握持手感与密封性能',specs:'材质:PP+TPE|工艺:双色注塑|标签:软硬结合、一体成型',status:'published'},
    {id:15,name:'Logo镶嵌件',cat:'2K',image:'images/ph_2k.svg',desc:'双色Logo镶嵌注塑件，品牌标识与产品一体化',specs:'材质:多材质|工艺:镶嵌注塑|标签:镶嵌、双色',status:'published'}
  ],
  news: [
    {id:1,title:'弘欧科技通过ISO 13485年度监督审核',date:'2026-07-28',cat:'公司新闻',summary:'顺利通过ISO 13485年度监督审核，审核范围覆盖注塑件生产全过程',content:'2026年7月28日，弘欧科技顺利通过ISO 13485医疗器械质量管理体系年度监督审核，审核范围覆盖注塑件生产全过程。',image:'',status:'published'},
    {id:2,title:'两台TOYO CS-230全电动注塑机投入生产',date:'2026-06-15',cat:'公司新闻',summary:'新引进两台日本TOYO CS-230全电动注塑机，已正式投入十万级净化车间运行',content:'为满足医疗器械客户日益增长的订单需求，公司新引进两台TOYO CS-230全电动注塑机，现已正式投入十万级净化车间运行。',image:'',status:'published'},
    {id:3,title:'弘欧科技亮相CMEF 2026中国国际医疗器械博览会',date:'2026-05-10',cat:'行业资讯',summary:'携肠内营养输注系统和注射给药系统等核心产品亮相CMEF 2026，与多家企业达成合作意向',content:'弘欧科技参加CMEF 2026中国国际医疗器械博览会，展出肠内营养输注系统、注射给药系统等核心产品，与多家国内外企业达成合作意向。',image:'',status:'published'},
    {id:4,title:'瑞士Hauser S35坐标磨完成安装调试',date:'2026-04-22',cat:'公司新闻',summary:'精度0.001mm的瑞士Hauser S35坐标磨完成安装调试，进一步提升精密模具加工能力',content:'瑞士Hauser S35坐标磨（精度0.001mm）完成安装调试并投入使用，进一步提升精密模具加工能力。',image:'',status:'published'},
    {id:5,title:'弘欧模具通过IATF 16949换证审核',date:'2026-03-08',cat:'公司新闻',summary:'IATF 16949换证审核顺利通过，体系有效性获高度评价',content:'弘欧模具顺利通过IATF 16949汽车行业质量管理体系换证审核，体系运行有效性获审核组高度评价。',image:'',status:'published'},
    {id:6,title:'十万级净化车间通过国际客户年度现场审核',date:'2026-02-20',cat:'公司新闻',summary:'零整改项通过国际客户年度现场审核，获优秀评价',content:'十万级净化车间通过国际客户年度现场审核，零整改项通过，获评优秀。',image:'',status:'published'},
    {id:7,title:'德国RODERS高速加工中心到厂安装',date:'2026-01-12',cat:'公司新闻',summary:'新引进德国RODERS RXP 500 DCS高速加工中心完成安装',content:'新引进德国RODERS高速加工中心RXP 500 DCS完成安装，进一步强化模具中心加工实力。',image:'',status:'published'}
  ],
  certificates: [
    {id:1,name:'IATF 16949汽车行业质量管理体系',body:'IATF',number:'IATF-2024-7890',date:'2024-01-15 ~ 2027-01-14',image:'images/cert_1_page1.webp'},
    {id:2,name:'ISO 13485医疗器械质量管理体系',body:'SGS',number:'CN23/12345',date:'2023-06-01 ~ 2026-05-31',image:'images/cert_2_page1.webp'},
    {id:3,name:'ISO 9001质量管理体系',body:'SGS',number:'CN22/67890',date:'2022-03-01 ~ 2025-02-28',image:'images/cert_3_page1.webp'}
  ],
  equipment: [
    {id:1,name:'Hauser S35',model:'坐标磨',type:'cnc',qty:1,status:'运行中',specs:'产地:瑞士|精度:0.001mm',location:'模具中心'},
    {id:2,name:'Hauser S50L',model:'坐标磨',type:'cnc',qty:1,status:'运行中',specs:'产地:瑞士|精度:0.001mm',location:'模具中心'},
    {id:3,name:'Mazak QTE 200L',model:'CNC车床',type:'cnc',qty:1,status:'运行中',specs:'产地:日本|精度:±0.002mm',location:'模具中心'},
    {id:4,name:'Kellenberger K10',model:'数控磨床',type:'cnc',qty:1,status:'运行中',specs:'产地:瑞士|精度:±0.0005mm',location:'模具中心'},
    {id:5,name:'MAKINO V90S',model:'五轴龙门',type:'cnc',qty:1,status:'运行中',specs:'产地:日本|精度:0.005mm',location:'模具中心'},
    {id:6,name:'YASDA YMC430',model:'高速CNC',type:'cnc',qty:2,status:'运行中',specs:'产地:日本|精度:0.001mm',location:'模具中心'},
    {id:7,name:'YASDA YMC650',model:'高速CNC',type:'cnc',qty:1,status:'运行中',specs:'产地:日本|精度:0.001mm',location:'模具中心'},
    {id:8,name:'RODERS RXP501',model:'CNC',type:'cnc',qty:1,status:'运行中',specs:'产地:德国|精度:0.002mm',location:'模具中心'},
    {id:9,name:'RODERS RXP601DSH',model:'五轴CNC',type:'cnc',qty:1,status:'运行中',specs:'产地:德国|精度:0.002mm',location:'模具中心'},
    {id:10,name:'FANUC A-T14iF',model:'CNC',type:'cnc',qty:1,status:'运行中',specs:'产地:日本|精度:0.005mm',location:'模具中心'},
    {id:11,name:'FANUC a-D21MiB',model:'CNC',type:'cnc',qty:2,status:'运行中',specs:'产地:日本|精度:0.005mm',location:'模具中心'},
    {id:12,name:'HURCO VMX42HSi',model:'CNC',type:'cnc',qty:2,status:'运行中',specs:'产地:美国|精度:0.005mm',location:'模具中心'},
    {id:13,name:'AWEA SP-2016',model:'龙门',type:'cnc',qty:1,status:'运行中',specs:'产地:台湾|精度:0.01mm',location:'模具中心'},
    {id:14,name:'WELE RB-212',model:'龙门',type:'cnc',qty:1,status:'运行中',specs:'产地:台湾|精度:0.01mm',location:'模具中心'},
    {id:15,name:'YCM NCV-102AM',model:'CNC铣',type:'cnc',qty:2,status:'运行中',specs:'产地:台湾',location:'模具中心'},
    {id:16,name:'YCM NXV-1020AM',model:'CNC铣',type:'cnc',qty:1,status:'运行中',specs:'产地:台湾',location:'模具中心'},
    {id:17,name:'KERUISI K-540A',model:'CNC',type:'cnc',qty:2,status:'运行中',specs:'产地:中国|精度:0.005mm',location:'模具中心'},
    {id:18,name:'KERUISI K540iH',model:'CNC',type:'cnc',qty:2,status:'运行中',specs:'产地:中国|精度:0.005mm',location:'模具中心'},
    {id:19,name:'AgieCharmilles Form P350',model:'EDM',type:'edm',qty:3,status:'运行中',specs:'产地:瑞士|精度:0.002mm',location:'模具中心'},
    {id:20,name:'Sodick AD32Ls',model:'EDM',type:'edm',qty:2,status:'运行中',specs:'产地:日本|精度:0.005mm',location:'模具中心'},
    {id:21,name:'MAKINO EDGE3i',model:'EDM',type:'edm',qty:1,status:'运行中',specs:'产地:日本|精度:0.005mm',location:'模具中心'},
    {id:22,name:'MAKINO EDGE2i',model:'EDM',type:'edm',qty:1,status:'运行中',specs:'产地:日本|精度:0.003mm',location:'模具中心'},
    {id:23,name:'Seibu M50HP',model:'线切割',type:'wire',qty:2,status:'运行中',specs:'产地:日本',location:'模具中心'},
    {id:24,name:'SODICK AQ550LS',model:'线切割',type:'wire',qty:1,status:'运行中',specs:'产地:日本|精度:0.003mm',location:'模具中心'},
    {id:25,name:'SODICK AQ360LS',model:'线切割',type:'wire',qty:1,status:'运行中',specs:'产地:日本|精度:0.005mm',location:'模具中心'},
    {id:26,name:'SANNIU',model:'线切割',type:'wire',qty:3,status:'运行中',specs:'产地:台湾',location:'模具中心'},
    {id:27,name:'Okamoto 126DX',model:'精密磨床',type:'grinder',qty:1,status:'运行中',specs:'产地:日本|精度:0.002mm',location:'模具中心'},
    {id:28,name:'Okamoto 95DX',model:'精密磨床',type:'grinder',qty:1,status:'运行中',specs:'产地:日本|精度:0.005mm',location:'模具中心'},
    {id:29,name:'Okamoto ACC-450ST',model:'精密磨床',type:'grinder',qty:2,status:'运行中',specs:'产地:日本|精度:0.002mm',location:'模具中心'},
    {id:30,name:'PERMANET 618S',model:'精密磨床',type:'grinder',qty:1,status:'运行中',specs:'产地:台湾|精度:0.005mm',location:'模具中心'},
    {id:31,name:'PERMANET HF618S',model:'精密磨床',type:'grinder',qty:1,status:'运行中',specs:'产地:台湾|精度:0.01mm',location:'模具中心'},
    {id:32,name:'SUMITOMO SE50EV',model:'注塑机',type:'injection',qty:2,status:'运行中',specs:'产地:日本|吨位:500KN',location:'B栋1楼洁净车间'},
    {id:33,name:'SUMITOMO SE100EV',model:'注塑机',type:'injection',qty:4,status:'运行中',specs:'产地:日本|吨位:1000KN',location:'B栋1楼洁净车间'},
    {id:34,name:'SUMITOMO SE180EV',model:'注塑机',type:'injection',qty:4,status:'运行中',specs:'产地:日本|吨位:1800KN',location:'B栋1楼洁净车间'},
    {id:35,name:'TOYO CS-230',model:'注塑机',type:'injection',qty:2,status:'运行中',specs:'产地:日本|吨位:2300KN',location:'B栋1楼洁净车间'},
    {id:36,name:'TOYO CS-280',model:'注塑机',type:'injection',qty:1,status:'运行中',specs:'产地:日本|吨位:2800KN',location:'B栋1楼洁净车间'},
    {id:37,name:'HAITIAN 90~800',model:'注塑机',type:'injection',qty:4,status:'运行中',specs:'产地:中国|吨位:900~8000KN',location:'B栋1楼洁净车间'},
    {id:38,name:'BALZEA V200SD',model:'立式注塑机',type:'injection',qty:1,status:'运行中',specs:'产地:-|吨位:2000KN',location:'B栋1楼洁净车间'},
    {id:39,name:'ZSV160/120-LSR',model:'LSR专用注塑机',type:'injection',qty:3,status:'运行中',specs:'产地:-|LSR专用',location:'B栋1楼洁净车间'},
    {id:40,name:'HEXAGON VIEWMAX D4',model:'CMM+3D扫描',type:'qc',qty:1,status:'运行中',specs:'精度:0.005mm',location:'A栋2楼质检中心'},
    {id:41,name:'HEXAGON Global S 5.07.05',model:'CMM',type:'qc',qty:1,status:'运行中',specs:'精度:0.0012mm',location:'A栋2楼质检中心'},
    {id:42,name:'HEXAGON Classic 686',model:'CMM',type:'qc',qty:1,status:'运行中',specs:'精度:0.0017mm',location:'A栋2楼质检中心'},
    {id:43,name:'NIKON VMA-4540',model:'2.5D CMM',type:'qc',qty:1,status:'运行中',specs:'精度:0.0012mm',location:'A栋2楼质检中心'},
    {id:44,name:'HEXAGON RigelScan Ultra',model:'手持3D扫描',type:'qc',qty:1,status:'运行中',specs:'精度:0.02mm',location:'A栋2楼质检中心'}
  ],
  partners: [
    {id:1,name:'美敦力 Medtronic',logo:'',link:'https://www.medtronic.com',country:'美国'},
    {id:2,name:'强生 J&J',logo:'',link:'https://www.jnj.com',country:'美国'},
    {id:3,name:'迈瑞 Mindray',logo:'',link:'https://www.mindray.com',country:'中国'},
    {id:4,name:'GE Healthcare',logo:'',link:'https://www.gehealthcare.com',country:'美国'},
    {id:5,name:'博世 Bosch',logo:'',link:'https://www.bosch.com',country:'德国'}
  ],
  pageAnalytics: [
    {page:'首页',views:12580,avgTime:'2m 35s',bounceRate:'32.5%'},
    {page:'关于我们',views:8420,avgTime:'3m 12s',bounceRate:'28.7%'},
    {page:'产品与服务',views:9650,avgTime:'4m 08s',bounceRate:'25.3%'},
    {page:'模具中心',views:5630,avgTime:'3m 45s',bounceRate:'30.1%'},
    {page:'资质实力',views:4210,avgTime:'2m 50s',bounceRate:'35.2%'},
    {page:'新闻动态',views:3890,avgTime:'1m 55s',bounceRate:'41.8%'},
    {page:'联系我们',views:3120,avgTime:'1m 20s',bounceRate:'45.6%'},
    {page:'客户案例',views:2780,avgTime:'2m 05s',bounceRate:'38.9%'},
    {page:'全球合作伙伴',views:1950,avgTime:'1m 40s',bounceRate:'42.1%'}
  ],
  visits: {today:187,yesterday:156},
  inquiries: [
    {id:1,name:'张伟',company:'深圳迈瑞生物医疗电子股份有限公司',email:'zhangwei@mindray.com',phone:'+86 13800138001',content:'咨询肠内营养输注系统批量采购，年需求量约50万套',date:'2026-08-10',status:'unread'},
    {id:2,name:'John Smith',company:'Medtronic Inc.',email:'john.smith@medtronic.com',phone:'+1 612-555-0102',content:'Inquiry about LSR sealing components for insulin pump project',date:'2026-08-09',status:'unread'},
    {id:3,name:'李芳',company:'广州瑞派医疗器械有限公司',email:'lifang@reapmed.com',phone:'+86 13900139002',content:'需要定制PP外壳模具，需求量每月10万件',date:'2026-08-08',status:'read'},
    {id:4,name:'Michael Chen',company:'Baxter International',email:'m.chen@baxter.com',phone:'+1 224-555-0187',content:'Requesting quote for 2K overmolded grips, annual volume 2M units',date:'2026-08-07',status:'read'},
    {id:5,name:'王磊',company:'上海联影医疗科技股份有限公司',email:'wanglei@united-imaging.com',phone:'+86 13700137003',content:'咨询医疗设备外壳注塑加工，需ISO 13485认证',date:'2026-08-06',status:'replied'},
    {id:6,name:'Sarah Johnson',company:'Stryker Corporation',email:'s.johnson@stryker.com',phone:'+1 269-555-0192',content:'Need PP housings for surgical instruments, requested samples',date:'2026-08-05',status:'replied'},
    {id:7,name:'赵明',company:'北京华大基因',email:'zhaoming@genomics.cn',phone:'+86 13600136004',content:'询价：实验室耗材注塑，要求十万级洁净车间生产',date:'2026-08-04',status:'unread'},
    {id:8,name:'田中健一',company:'Terumo Corporation',email:'k.tanaka@terumo.co.jp',phone:'+81 3-5550-1234',content:'LSR部品の見積もり依頼、医療用チューブコネクタ',date:'2026-08-03',status:'unread'}
  ],
  settings: {
    siteName:'HONDVO Technology',
    logo:'images/logo.webp',
    seoTitle:'HONDVO Technology - 精密医疗器械组件与精密模具制造',
    seoDesc:'ISO 13485 / ISO 9001 / IATF 16949三重认证，专注II类无源医疗器械注塑部件与精密模具制造',
    contactPhone:'+86 769 8188 9275',
    contactEmail:'info@hondvotechnology.com',
    contactAddress:'广东省东莞市长安镇上沙社区中南中路84号博业工业园'
  },
  i18n: [
    {key:'page_title',zh:'HONDVO Technology - 精密医疗',en:'HONDVO Technology - Precision Medical',de:'HONDVO Technology - Präzisionsmedizin',ja:'HONDVO Technology - 精密医療'},
    {key:'hero_title',zh:'精密制造·生命与健康的守护者',en:'Precision Manufacturing',de:'Präzisionsfertigung',ja:'精密製造'},
    {key:'hero_desc',zh:'无源二类医疗器械注塑部件',en:'Class II passive medical injection components',de:'Medizinische Spritzgussteile Klasse II',ja:'クラスII医療用射出成形部品'},
    {key:'nav_home',zh:'首页',en:'Home',de:'Startseite',ja:'ホーム'},
    {key:'nav_about',zh:'关于我们',en:'About Us',de:'Über uns',ja:'会社概要'},
    {key:'nav_products',zh:'产品服务',en:'Products & Services',de:'Produkte & Dienstleistungen',ja:'製品・サービス'},
    {key:'nav_contact',zh:'联系我们',en:'Contact Us',de:'Kontakt',ja:'お問い合わせ'}
  ],
  homepage: {
    stats: [
      {label:'台加工设备',value:'109'},
      {label:'台注塑机',value:'21'},
      {label:'人专业团队',value:'125'},
      {label:'项国际认证',value:'3'},
      {label:'个净化车间',value:'2'},
      {label:'人设计团队',value:'6'}
    ],
    coreBusiness: [
      {image:'',title:'肠内营养输注系统',desc:'硅胶营养瓶体、注塑瓶盖、分流接头、管路接头——符合II类医疗器械法规要求',btnText:'了解详情',link:'#page-products'},
      {image:'',title:'注射给药系统',desc:'高精度注射器筒体与推杆组件，严格控制尺寸公差与表面质量',btnText:'了解详情',link:'#page-products'},
      {image:'',title:'精密注塑模具',desc:'23台CNC · 8台EDM · 7台线切割 · Hauser / RODERS / YASDA 顶级设备矩阵',btnText:'了解详情',link:'#page-mold'}
    ],
    partners: [
      {name:'Medtronic',image:''},
      {name:'Baxter',image:''},
      {name:'B. Braun',image:''},
      {name:'Fresenius',image:''},
      {name:'Johnson & Johnson',image:''},
      {name:'Stryker',image:''},
      {name:'Abbott',image:''},
      {name:'Terumo',image:''}
    ],
    cta: {
      title:'有医疗器械部件需求？',
      btnText:'立即咨询'
    },
    hero: {
      images: [],
      subTitle:'',title1:'',title2:'',desc1:'',desc2:'',
      leftBtnText:'',leftBtnLink:'',rightBtnText:'',rightBtnLink:'',bottomGuide:''
    },
    globals: {logo:'images/logo.webp',brandName:'HONDVO Technology',navBtnText:'立即询价',cookieText:'本站使用Cookie与匿名统计技术以提升体验，继续浏览即表示您同意隐私政策。'},
    footer: {
      copyright:'© 2026 HONDVO Technology (Dongguan) Co., Ltd. & HONDVO TOOLING LIMITED (Dongguan) Co., Ltd.',
      icp:'粤ICP备XXXXXXXX号',
      links: [
        {text:'关于我们',url:'#page-about'},{text:'核心价值',url:'#page-about'},{text:'弘欧精神',url:'#page-about'},{text:'全球合作伙伴',url:'#page-about'},{text:'客户案例',url:'#page-about'},{text:'团队',url:'#page-about'},
        {text:'肠内营养输注系统',url:'#page-products'},{text:'注射给药系统',url:'#page-products'},{text:'其他II类组件',url:'#page-products'},{text:'精密模具',url:'#page-mold'},
        {text:'模具设计',url:'#page-mold'},{text:'精密加工',url:'#page-mold'},{text:'注塑生产',url:'#page-mold'},{text:'品质管控',url:'#page-mold'},
        {text:'ISO 13485',url:'#page-qualifications'},{text:'IATF 16949',url:'#page-qualifications'},{text:'ISO 9001',url:'#page-qualifications'},{text:'生产环境',url:'#page-qualifications'},{text:'IQ/OQ/PQ验证',url:'#page-qualifications'},
        {text:'公司新闻',url:'#page-news'},{text:'行业资讯',url:'#page-news'},
        {text:'招贤纳士',url:'#page-contact'},{text:'联系方式',url:'#page-contact'}
      ],
      socialLinks: [
        {platform:'email',url:''},
        {platform:'phone',url:''},
        {platform:'chat',url:''}
      ]
    }
  },
  nextId: {products:16,news:8,certificates:4,equipment:45,partners:6,inquiries:9,media:1},
  media: [],
  about: {
    who: {
      title:'HONDVO',
      subtitle:'弘欧模具（东莞）有限公司 / 弘欧科技（东莞）有限公司',
      description:'弘欧模具（东莞）有限公司具备从超精密注塑模具设计、制造到交付的全链路能力，配备Hauser、RODERS、YASDA等世界级精密加工设备矩阵，专注于医疗、汽车等领域的高精度模具解决方案。\n\n弘欧科技（东莞）有限公司拥有21台注塑机，包括SUMITOMO全电动系列、TOYO液压系列以及LSR液态硅胶专用注塑机，覆盖500KN至8000KN的吨位需求。目前已建成两座十万级净化车间，专注于II类无源医疗器械注塑部件的研发与生产。\n\n当前重点聚焦医疗器械领域，覆盖以下细分方向：\n1. IVD体外诊断耗材\n2. 药物输送器械\n3. 外科手术器械部件\n4. 医疗电子外壳\n5. 高附加值包胶组件\n\n公司拥有两座十万级净化车间，支持完整的IQ/OQ/PQ验证体系，已通过ISO 13485医疗器械质量管理体系认证。同时承接工业级注塑订单，服务多领域客户。',
      image:'',
      techTitle:'HONDVO Technology (Dongguan) Co., Ltd.',
      techDesc:'依托弘欧精密模具的强大制造能力，承接各类高精度注塑产品的研发与量产。公司配备 21 台注塑机，涵盖 SUMITOMO 全电动、TOYO 液压机及液态硅胶 LSR 专用机型，从精密结构件、透明光学件、包胶件到液态硅胶件均可一站式交付。',
      techFocus:'当前重点深耕医疗器械领域，主要产品包括：',
      specializations:[
        {title:'体外诊断耗材',desc:'反应杯、试剂条、微流控芯片、比色皿等精密微注塑部件'},
        {title:'给药装置',desc:'胰岛素笔组件、预灌封推杆、喷雾泵与阀门组件'},
        {title:'手术器械配件',desc:'一次性手术手柄、穿刺器组件、吻合器结构件'},
        {title:'医疗电子外壳',desc:'监护仪、输液泵、便携诊断设备等医疗器械的外壳与面板'},
        {title:'高值耗材包胶件',desc:'金属嵌件注塑、液态硅胶密封件、医用导管接头及鲁尔接口'}
      ],
      techCert:'生产环境拥有两个十万级净化车间，全面支持 IQ/OQ/PQ 验证服务，严格遵循 ISO 13485 质量管理体系。',
      techMore:'与此同时，公司也承接智能机器人结构件、汽车功能件等工业级注塑订单，具备多领域并行交付能力。',
      moldTitle:'HONDVO TOOLING LIMITED (Dongguan) Co., Ltd.',
      moldDesc:'专业从事超精密注塑模具的设计、制造与交付。深耕模具领域多年，具备从产品结构评审、模具设计、精密加工到试模交付的全链路能力。拥有从瑞士 Hauser 坐标磨、德国 RODERS 五轴 CNC 到日本 YASDA 高速加工中心的全品牌设备矩阵，覆盖 CNC 加工、EDM 电火花、线切割、精密磨削等完整模具制造工序，模具精度可达微米级，广泛应用于医疗器械、智能机器人、汽车零部件等高端制造领域。',
      stats:[
        {value:'109',label:'加工设备'},
        {value:'21',label:'注塑机'},
        {value:'125',label:'专业团队'},
        {value:'3',label:'国际认证'},
        {value:'2',label:'净化车间'},
        {value:'20',label:'设计团队'}
      ]
    },
    values: {
      title:'核心价值',
      items:[
        {icon:'icon-precision',title:'精密至上',desc:'微米级制造精度，每一件组件都经过严格的尺寸与性能检测'},
        {icon:'icon-innovation',title:'持续创新',desc:'持续引进世界一流设备与先进工艺，驱动技术迭代升级'},
        {icon:'icon-winwin',title:'诚信共赢',desc:'全链条透明协作，交付可靠、响应灵活'},
        {icon:'icon-global',title:'全球视野',desc:'服务欧洲、北美、日本、韩国等医疗客户，提供专业多语言技术支持'}
      ]
    },
    spirit: {
      title:'弘欧精神',
      items:[
        {icon:'icon-diamond',title:'极致精密',desc:'追求每一副模具的微米级完美，让品质成为品牌根基'},
        {icon:'icon-lightbulb',title:'持续创新',desc:'以客户需求为驱动，工艺不断迭代，让技术始终走在行业前沿'},
        {icon:'icon-people',title:'客户至上',desc:'以工程实力和服务精神，与客户建立长期合作伙伴关系'}
      ]
    },
    partners: {
      title:'全球合作伙伴',
      items:[
        {logo:'images/logo_sumitomo.webp',name:'SUMITOMO',link:''},
        {logo:'images/logo_toyo.webp',name:'TOYO',link:''},
        {logo:'images/logo_hauser.webp',name:'Hauser',link:''},
        {logo:'images/logo_roders.webp',name:'RODERS',link:''},
        {logo:'images/logo_yasda.webp',name:'YASDA',link:''},
        {logo:'images/logo_makino.webp',name:'MAKINO',link:''},
        {logo:'images/logo_fanuc.webp',name:'FANUC',link:''},
        {logo:'images/logo_hexagon.webp',name:'HEXAGON',link:''}
      ]
    },
    cases: {
      title:'客户案例',
      items:[
        {image:'',industry:'IVD 体外诊断',title:'微流控芯片量产',challenge:'[示例：补充真实项目背景与客户需求]',solution:'[示例：补充我们的工艺与交付方案]',result:'[示例：补充关键指标与成果]'},
        {image:'',industry:'药物输送',title:'预灌封注射器组件精密注塑',challenge:'[示例：补充真实项目背景与客户需求]',solution:'[示例：补充我们的工艺与交付方案]',result:'[示例：补充关键指标与成果]'},
        {image:'',industry:'手术器械',title:'一次性穿刺器结构件',challenge:'[示例：补充真实项目背景与客户需求]',solution:'[示例：补充我们的工艺与交付方案]',result:'[示例：补充关键指标与成果]'}
      ]
    },
    team: {
      title:'团队',
      items:[
        {avatar:'images/team_1.webp',name:'张伟',title:'技术总监',bio:'20年精密模具设计经验，曾主导多项国际医疗器械模具项目'},
        {avatar:'images/team_2.webp',name:'李娜',title:'质量总监',bio:'15年医疗行业质量管理经验，ISO 13485主任审核员'},
        {avatar:'images/team_3.webp',name:'王强',title:'生产总监',bio:'18年注塑生产管理经验，精通LSR/双色/包胶注塑工艺'},
        {avatar:'images/team_4.webp',name:'陈敏',title:'研发总监',bio:'12年医疗器械研发经验，多项医疗注塑组件专利'}
      ]
    }
  },
  qual: {
    bannerTitle:'资质认证',
    bannerSub:'国际标准认证 · 十万级洁净车间 · 验证能力',
    env: {
      title:'生产环境',
      sub:'十万级洁净车间，满足医疗器械生产要求',
      images:['images/workshop_1.webp','images/workshop_2.webp'],
      description:'十万级净化车间，满足医疗器械生产环境要求，配备恒温恒湿控制系统',
      highlights:[]
    },
    iqoqpq: {
      title:'IQ/OQ/PQ验证体系',
      iq:{title:'IQ 安装确认',desc:'验证设备/模具安装环境、规格参数及校准状态符合要求'},
      oq:{title:'OQ 运行确认',desc:'验证设备在规定工艺参数范围内可稳定运行'},
      pq:{title:'PQ 性能确认',desc:'多批次连续生产验证，以统计数据证明过程能力'}
    }
  },
  contact: {
    bannerTitle:'联系我们',
    bannerSub:'双公司地址 · 欢迎莅临交流',
    purchaseCards:[
      {title:'模具销售',btnText:'获取报价'},
      {title:'成品采购',btnText:'获取报价'},
      {title:'OEM 代工',btnText:'获取报价'}
    ],
    otherTitle:'其他咨询',
    moldName:'HONDVO TOOLING LIMITED (Dongguan) Co., Ltd.',
    moldAddr:'广东省东莞市长安镇上沙社区中南中路84号博业工业园',
    techName:'HONDVO Technology (Dongguan) Co., Ltd.',
    techAddr:'广东省东莞市长安镇长安建安路790号2栋2单元301室',
    phone:'+86 769 8188 9275',
    email:'info@hondvotechnology.com',
    workHours:'周一至周五 8:00 - 17:30',
    mapEmbed:'',
    qrImage:'images/qrcode.webp',
    qrLabel:'扫码添加企业微信',
    formLabels:{name:'姓名',company:'公司',phone:'电话',email:'邮箱',type:'咨询类型',desc:'需求描述'},
    formPlaceholders:{name:'请输入您的姓名',company:'请输入公司名称',phone:'请输入联系电话',email:'请输入邮箱地址',desc:'请描述您的产品需求、技术规格、预计数量等信息'},
    formOptions:['请选择','医疗器械注塑件','精密模具制造','模具+注塑一站式','其他咨询'],
    formSubmit:'提交',
    socialLinks:[
      {platform:'email',url:''},
      {platform:'phone',url:''},
      {platform:'chat',url:''}
    ]
  },
  newsPage: { bannerTitle:'新闻动态', bannerSub:'公司新闻 · 行业资讯' },
  productsPage: {
    bannerTitle:'产品与服务',
    bannerSub:'II类无源医疗器械注塑部件',
    categories:[
      {key:'lsr',icon:'LSR',title:'LSR 液体硅胶产品',desc:'医疗级液态硅胶注塑产品，满足生物相容性要求'},
      {key:'pp',icon:'PP',title:'注塑产品',desc:'面向医用耗材与工业部件的精密注塑'},
      {key:'2k',icon:'2K',title:'双色/多色产品',desc:'双色/多色一体化成型，减少二次加工'}
    ],
    coreTitle:'核心产品线',
    coreSub:'核心产品线',
    coreItems:[
      {image:'',title:'肠内营养输注系统',desc:'硅胶营养瓶体、注塑瓶盖、分流接头、管路接头——符合II类医疗器械法规要求',link:'IQ/OQ/PQ 验证'},
      {image:'',title:'注射给药系统',desc:'高精度注射器筒体与推杆组件，严格控制尺寸公差与表面质量',link:'IQ/OQ/PQ 验证'},
      {image:'',title:'其他II类医疗器械组件',desc:'按客户需求定制II类医疗器械注塑组件，覆盖外壳、接头、管路配件等',link:'支持定制开发'}
    ]
  },
  moldPage: {
    bannerTitle:'模具中心',
    bannerSub:'世界级设备矩阵 · 完整的模具制造能力',
    gallery:[
      {image:'',desc:'多腔精密注塑模具——镜面抛光，配备热流道温控系统'},
      {image:'',desc:'热流道精密模具——多腔设计，独立温控模块'},
      {image:'',desc:'液态硅胶（LSR）注塑模具——精密型腔，一体化定位框架'},
      {image:'',desc:'多腔滑块模具——Mastip 热流道系统，高光镜面'}
    ],
    verifyPrefix:'IQ/OQ/PQ 验证支持：',
    verifyText:'所有模具与注塑工艺均支持安装确认（IQ）、运行确认（OQ）、性能确认（PQ），满足医疗器械法规要求。',
    categories:[
      {key:'cnc',title:'CNC 加工中心（23 台）'},
      {key:'edm',title:'EDM 电火花机（8 台）'},
      {key:'wire',title:'线切割（7 台）'},
      {key:'grinder',title:'精密磨床（9 台）'},
      {key:'injection',title:'注塑机（21 台）'},
      {key:'qc',title:'品质检测设备（8 台）'}
    ]
  }
};

let DB = loadData() || JSON.parse(JSON.stringify(DEFAULT_DB));

// Migration: ensure new fields exist on existing DBs（异常被捕获，保证登录事件照常绑定）
(function migrateDB(){
  try {
  let dirty = false;
  if (!DB.pageAnalytics) { DB.pageAnalytics = JSON.parse(JSON.stringify(DEFAULT_DB.pageAnalytics)); dirty = true; }
  if (!DB.visits) { DB.visits = JSON.parse(JSON.stringify(DEFAULT_DB.visits)); dirty = true; }
  if (!DB.homepage) { DB.homepage = JSON.parse(JSON.stringify(DEFAULT_DB.homepage)); dirty = true; }
  if (!DB.homepage.stats) { DB.homepage.stats = JSON.parse(JSON.stringify(DEFAULT_DB.homepage.stats)); dirty = true; }
  // 统计项 label：旧英文 key → 新中文
  var _statLabelMap = {'stat_machines':'台加工设备','stat_injection':'台注塑机','stat_team':'人专业团队','stat_certs':'项国际认证','stat_cleanrooms':'个净化车间','stat_design':'人设计团队'};
  DB.homepage.stats.forEach(function(s){
    if (s.label !== undefined && _statLabelMap[s.label]) { s.label = _statLabelMap[s.label]; dirty = true; }
  });
  if (!DB.homepage.coreBusiness) { DB.homepage.coreBusiness = JSON.parse(JSON.stringify(DEFAULT_DB.homepage.coreBusiness)); dirty = true; }
  DB.homepage.coreBusiness.forEach(function(b){
    if (b.btnText === undefined) { b.btnText = '了解详情'; dirty = true; }
    if (b.link === undefined) { b.link = '#page-products'; dirty = true; }
    // 核心业务标题：旧英文 → 新中文（仅匹配旧默认值时覆盖，用户编辑过不动）
    var _coreTitleMap = {
      'Enteral Nutrition Infusion System':'肠内营养输注系统',
      'Injection Drug Delivery System':'注射给药系统',
      'Precision Injection Molds':'精密注塑模具'
    };
    if (b.title && _coreTitleMap[b.title]) { b.title = _coreTitleMap[b.title]; dirty = true; }
  });
  if (!DB.homepage.partners) { DB.homepage.partners = JSON.parse(JSON.stringify(DEFAULT_DB.homepage.partners)); dirty = true; }
  if (!DB.homepage.cta) { DB.homepage.cta = JSON.parse(JSON.stringify(DEFAULT_DB.homepage.cta)); dirty = true; }
  // CTA：旧英文 → 新中文（仅匹配旧默认值时覆盖）
  if (DB.homepage.cta.title === 'Need Medical Device Components?') { DB.homepage.cta.title = DEFAULT_DB.homepage.cta.title; dirty = true; }
  if (DB.homepage.cta.btnText === 'Contact Us Now') { DB.homepage.cta.btnText = DEFAULT_DB.homepage.cta.btnText; dirty = true; }
  if (DB.homepage.heroslides !== undefined) { delete DB.homepage.heroslides; dirty = true; }
  if (DB.homepage.heroNextId !== undefined) { delete DB.homepage.heroNextId; dirty = true; }
  if (!DB.homepage.hero) { DB.homepage.hero = JSON.parse(JSON.stringify(DEFAULT_DB.homepage.hero)); dirty = true; }
  if (!DB.about) { DB.about = JSON.parse(JSON.stringify(DEFAULT_DB.about)); dirty = true; }
  // 空值保护：旧数据可能缺 who / cases / spirit 等子对象，缺失则补默认，避免后续访问崩溃
  if (!DB.about.who) { DB.about.who = JSON.parse(JSON.stringify(DEFAULT_DB.about.who)); dirty = true; }
  if (!DB.about.cases) { DB.about.cases = JSON.parse(JSON.stringify(DEFAULT_DB.about.cases)); dirty = true; }
  if (!DB.about.values) { DB.about.values = JSON.parse(JSON.stringify(DEFAULT_DB.about.values)); dirty = true; }
  if (!DB.about.spirit || !DB.about.spirit.items) { DB.about.spirit = JSON.parse(JSON.stringify(DEFAULT_DB.about.spirit)); dirty = true; }
  if (!DB.about.partners) { DB.about.partners = JSON.parse(JSON.stringify(DEFAULT_DB.about.partners)); dirty = true; }
  if (!DB.about.team) { DB.about.team = JSON.parse(JSON.stringify(DEFAULT_DB.about.team)); dirty = true; }
  const _aw = DEFAULT_DB.about.who;
  if (DB.about.who.techTitle === undefined) { DB.about.who.techTitle = _aw.techTitle; dirty = true; }
  if (DB.about.who.techDesc === undefined) { DB.about.who.techDesc = _aw.techDesc; dirty = true; }
  if (DB.about.who.techFocus === undefined) { DB.about.who.techFocus = _aw.techFocus; dirty = true; }
  if (!Array.isArray(DB.about.who.specializations)) { DB.about.who.specializations = JSON.parse(JSON.stringify(_aw.specializations)); dirty = true; }
  if (DB.about.who.techCert === undefined) { DB.about.who.techCert = _aw.techCert; dirty = true; }
  if (DB.about.who.techMore === undefined) { DB.about.who.techMore = _aw.techMore; dirty = true; }
  if (DB.about.who.moldTitle === undefined) { DB.about.who.moldTitle = _aw.moldTitle; dirty = true; }
  if (DB.about.who.moldDesc === undefined) { DB.about.who.moldDesc = _aw.moldDesc; dirty = true; }
  if (!Array.isArray(DB.about.who.stats)) { DB.about.who.stats = JSON.parse(JSON.stringify(_aw.stats)); dirty = true; }
  const _acFirst = DB.about.cases.items && DB.about.cases.items[0];
  if (_acFirst && _acFirst.name !== undefined) { DB.about.cases.items = JSON.parse(JSON.stringify(DEFAULT_DB.about.cases.items)); dirty = true; }
  if (!DB.qual) { DB.qual = JSON.parse(JSON.stringify(DEFAULT_DB.qual)); dirty = true; }
  if (!DB.qual.env) { DB.qual.env = JSON.parse(JSON.stringify(DEFAULT_DB.qual.env)); dirty = true; }
  if (DB.qual.bannerTitle === undefined) { DB.qual.bannerTitle = DEFAULT_DB.qual.bannerTitle; dirty = true; }
  if (DB.qual.bannerSub === undefined) { DB.qual.bannerSub = DEFAULT_DB.qual.bannerSub; dirty = true; }
  if (DB.qual.env.sub === undefined) { DB.qual.env.sub = DEFAULT_DB.qual.env.sub; dirty = true; }
  if (!DB.contact) { DB.contact = JSON.parse(JSON.stringify(DEFAULT_DB.contact)); dirty = true; }
  const _cd = DEFAULT_DB.contact;
  if (DB.contact.bannerTitle === undefined) { DB.contact.bannerTitle = _cd.bannerTitle; dirty = true; }
  if (DB.contact.bannerSub === undefined) { DB.contact.bannerSub = _cd.bannerSub; dirty = true; }
  if (!Array.isArray(DB.contact.purchaseCards)) { DB.contact.purchaseCards = JSON.parse(JSON.stringify(_cd.purchaseCards)); dirty = true; }
  if (DB.contact.otherTitle === undefined) { DB.contact.otherTitle = _cd.otherTitle; dirty = true; }
  if (DB.contact.moldName === undefined) { DB.contact.moldName = _cd.moldName; dirty = true; }
  if (DB.contact.moldAddr === undefined) { DB.contact.moldAddr = _cd.moldAddr; dirty = true; }
  if (DB.contact.techName === undefined) { DB.contact.techName = _cd.techName; dirty = true; }
  if (DB.contact.techAddr === undefined) { DB.contact.techAddr = _cd.techAddr; dirty = true; }
  if (DB.contact.qrImage === undefined) { DB.contact.qrImage = _cd.qrImage; dirty = true; }
  if (DB.contact.qrLabel === undefined) { DB.contact.qrLabel = _cd.qrLabel; dirty = true; }
  if (!DB.contact.formLabels) { DB.contact.formLabels = JSON.parse(JSON.stringify(_cd.formLabels)); dirty = true; }
  if (!DB.contact.formPlaceholders) { DB.contact.formPlaceholders = JSON.parse(JSON.stringify(_cd.formPlaceholders)); dirty = true; }
  if (!Array.isArray(DB.contact.formOptions)) { DB.contact.formOptions = JSON.parse(JSON.stringify(_cd.formOptions)); dirty = true; }
  if (DB.contact.formSubmit === undefined) { DB.contact.formSubmit = _cd.formSubmit; dirty = true; }
  if (DB.contact.address !== undefined) { delete DB.contact.address; dirty = true; }
  if (!DB.newsPage) { DB.newsPage = JSON.parse(JSON.stringify(DEFAULT_DB.newsPage)); dirty = true; }
  if (DB.newsPage.bannerSub === undefined) { DB.newsPage.bannerSub = DB.newsPage.pageDesc || DEFAULT_DB.newsPage.bannerSub; dirty = true; }
  if (DB.newsPage.pageDesc !== undefined) { delete DB.newsPage.pageDesc; dirty = true; }
  if (!DB.productsPage) { DB.productsPage = JSON.parse(JSON.stringify(DEFAULT_DB.productsPage)); dirty = true; }
  if (!DB.moldPage) { DB.moldPage = JSON.parse(JSON.stringify(DEFAULT_DB.moldPage)); dirty = true; }
  if (!DB.nextId) { DB.nextId = JSON.parse(JSON.stringify(DEFAULT_DB.nextId)); dirty = true; }
  if (!DB.nextId.media) { DB.nextId.media = 1; dirty = true; }
  if (!DB.media) { DB.media = []; dirty = true; }
  if (!DB.publishHistory) { DB.publishHistory = []; dirty = true; }
  if (!Array.isArray(DB.publishVersion) || DB.publishVersion.length !== 3) { DB.publishVersion = [1,0,0]; dirty = true; }
  if (typeof DB.hasUnpublished !== 'boolean') { DB.hasUnpublished = false; dirty = true; }
  if (typeof DB.publishNotes !== 'string') { DB.publishNotes = ''; dirty = true; }
  // ── 全系统旧英文默认值 → 中文（仅匹配旧默认值时覆盖，用户编辑过的不动）──
  const _awStatMap = {'Machining Equipment':'加工设备','Injection Machines':'注塑机','Professional Team':'专业团队','Intl. Certifications':'国际认证','Cleanrooms':'净化车间','Design Team':'设计团队'};
  (DB.about.who.stats||[]).forEach(function(s){ if (s.label && _awStatMap[s.label]) { s.label = _awStatMap[s.label]; dirty = true; } });
  const _caseMap = {
    'Microfluidic Chip Mass Production':'微流控芯片量产',
    'Precision Molding of Prefilled Syringe Components':'预灌封注射器组件精密注塑',
    'Disposable Trocar Structural Components':'一次性穿刺器结构件'
  };
  (DB.about.cases.items||[]).forEach(function(c){
    if (c.title && _caseMap[c.title]) { c.title = _caseMap[c.title]; dirty = true; }
    if (c.industry === 'Drug Delivery') { c.industry = '药物输送'; dirty = true; }
    if (c.industry === 'Surgical Instruments') { c.industry = '手术器械'; dirty = true; }
    if (c.challenge === '[Sample: supplement real project background & client needs]') { c.challenge = '[示例：补充真实项目背景与客户需求]'; dirty = true; }
    if (c.solution === '[Sample: supplement our process & delivery solution]') { c.solution = '[示例：补充我们的工艺与交付方案]'; dirty = true; }
    if (c.result === '[Sample: supplement key metrics & outcomes]') { c.result = '[示例：补充关键指标与成果]'; dirty = true; }
  });
  if (DB.qual.bannerTitle === 'Qualifications') { DB.qual.bannerTitle = '资质认证'; dirty = true; }
  if (DB.qual.bannerSub === 'International standard certifications · Cleanrooms · Validation capabilities') { DB.qual.bannerSub = '国际标准认证 · 十万级洁净车间 · 验证能力'; dirty = true; }
  if (DB.qual.env.sub === 'Class 100,000 cleanrooms meeting medical device production requirements') { DB.qual.env.sub = '十万级洁净车间，满足医疗器械生产要求'; dirty = true; }
  if (DB.contact.bannerTitle === 'Contact Us') { DB.contact.bannerTitle = '联系我们'; dirty = true; }
  if (DB.contact.bannerSub === 'Dual-company addresses · Welcome to visit and discuss') { DB.contact.bannerSub = '双公司地址 · 欢迎莅临交流'; dirty = true; }
  const _pcMap = {'Mold Sales':'模具销售','Finished Products':'成品采购','OEM Manufacturing':'OEM 代工'};
  (DB.contact.purchaseCards||[]).forEach(function(c){
    if (c.title && _pcMap[c.title]) { c.title = _pcMap[c.title]; dirty = true; }
    if (c.btnText === 'Get a Quote') { c.btnText = '获取报价'; dirty = true; }
  });
  if (DB.contact.otherTitle === 'Other Inquiries') { DB.contact.otherTitle = '其他咨询'; dirty = true; }
  if (DB.contact.qrLabel === 'Scan to add WeCom') { DB.contact.qrLabel = '扫码添加企业微信'; dirty = true; }
  const _flMap = {name:'姓名',company:'公司',phone:'电话',email:'邮箱',type:'咨询类型',desc:'需求描述'};
  const _fpMap = {name:'请输入您的姓名',company:'请输入公司名称',phone:'请输入联系电话',email:'请输入邮箱地址',desc:'请描述您的产品需求、技术规格、预计数量等信息'};
  Object.keys(_flMap).forEach(function(k){ if (DB.contact.formLabels && DB.contact.formLabels[k] && _flMap[k] && DB.contact.formLabels[k] !== _flMap[k] && /^[A-Za-z]/.test(DB.contact.formLabels[k])) { DB.contact.formLabels[k] = _flMap[k]; dirty = true; } });
  Object.keys(_fpMap).forEach(function(k){ if (DB.contact.formPlaceholders && DB.contact.formPlaceholders[k] && /^[A-Za-z]/.test(DB.contact.formPlaceholders[k])) { DB.contact.formPlaceholders[k] = _fpMap[k]; dirty = true; } });
  const _foOld = ['Please Select','Medical Device Injection Parts','Precision Mold Manufacturing','Mold + Injection One-Stop','Other Inquiries'];
  const _foNew = ['请选择','医疗器械注塑件','精密模具制造','模具+注塑一站式','其他咨询'];
  if (DB.contact.formOptions && DB.contact.formOptions.length === _foOld.length && DB.contact.formOptions.every(function(v,i){ return v === _foOld[i]; })) { DB.contact.formOptions = _foNew.slice(); dirty = true; }
  if (DB.contact.formSubmit === 'Submit') { DB.contact.formSubmit = '提交'; dirty = true; }
  if (DB.newsPage.bannerTitle === 'News') { DB.newsPage.bannerTitle = '新闻动态'; dirty = true; }
  if (DB.newsPage.bannerSub === 'Company News · Industry Updates') { DB.newsPage.bannerSub = '公司新闻 · 行业资讯'; dirty = true; }
  if (DB.productsPage.bannerTitle === 'Products & Services') { DB.productsPage.bannerTitle = '产品与服务'; dirty = true; }
  if (DB.productsPage.bannerSub === 'Class II passive medical device injection components') { DB.productsPage.bannerSub = 'II类无源医疗器械注塑部件'; dirty = true; }
  if (DB.productsPage.coreTitle === 'Core Product Lines') { DB.productsPage.coreTitle = '核心产品线'; dirty = true; }
  if (DB.productsPage.coreSub === 'Core Product Lines') { DB.productsPage.coreSub = '核心产品线'; dirty = true; }
  const _ppCatMap = {
    'LSR Liquid Silicone Products':'LSR 液体硅胶产品',
    'Injection Molded Products':'注塑产品',
    'Two-shot / Multi-color Products':'双色/多色产品'
  };
  const _ppCatDescMap = {
    'Medical-grade liquid silicone injection products meeting biocompatibility requirements':'医疗级液态硅胶注塑产品，满足生物相容性要求',
    'High-precision injection molding for medical consumables and industrial parts':'面向医用耗材与工业部件的精密注塑',
    'Integrated two-shot / multi-color molding, reducing secondary processing':'双色/多色一体化成型，减少二次加工'
  };
  (DB.productsPage.categories||[]).forEach(function(c){
    if (c.title && _ppCatMap[c.title]) { c.title = _ppCatMap[c.title]; dirty = true; }
    if (c.desc && _ppCatDescMap[c.desc]) { c.desc = _ppCatDescMap[c.desc]; dirty = true; }
  });
  const _ppItemMap = {
    'Enteral Nutrition Infusion System':'肠内营养输注系统',
    'Injection Drug Delivery System':'注射给药系统',
    'Other Class II Device Components':'其他II类医疗器械组件'
  };
  const _ppItemDescMap = {
    'Silicone nutrition bottle bodies, injection-molded caps, diverter connectors, tubing fittings — meeting Class II medical device regulations':'硅胶营养瓶体、注塑瓶盖、分流接头、管路接头——符合II类医疗器械法规要求',
    'High-precision syringe barrels and plunger assemblies with strict dimensional tolerance and surface finish control':'高精度注射器筒体与推杆组件，严格控制尺寸公差与表面质量',
    'Customized Class II medical device injection components per customer requirements, covering housings, connectors, tubing fittings, etc.':'按客户需求定制II类医疗器械注塑组件，覆盖外壳、接头、管路配件等'
  };
  (DB.productsPage.coreItems||[]).forEach(function(it){
    if (it.title && _ppItemMap[it.title]) { it.title = _ppItemMap[it.title]; dirty = true; }
    if (it.desc && _ppItemDescMap[it.desc]) { it.desc = _ppItemDescMap[it.desc]; dirty = true; }
    if (it.link === 'IQ/OQ/PQ Validation') { it.link = 'IQ/OQ/PQ 验证'; dirty = true; }
    if (it.link === 'Custom Development Available') { it.link = '支持定制开发'; dirty = true; }
  });
  if (DB.moldPage.bannerTitle === 'Mold Center') { DB.moldPage.bannerTitle = '模具中心'; dirty = true; }
  if (DB.moldPage.bannerSub === 'World-class equipment matrix · Complete mold manufacturing capability') { DB.moldPage.bannerSub = '世界级设备矩阵 · 完整的模具制造能力'; dirty = true; }
  if (DB.moldPage.verifyPrefix === 'IQ/OQ/PQ Validation Support: ') { DB.moldPage.verifyPrefix = 'IQ/OQ/PQ 验证支持：'; dirty = true; }
  if (DB.moldPage.verifyText === 'All molds and injection processes support Installation Qualification (IQ), Operational Qualification (OQ), and Performance Qualification (PQ), ensuring compliance with medical device regulatory requirements.') { DB.moldPage.verifyText = '所有模具与注塑工艺均支持安装确认（IQ）、运行确认（OQ）、性能确认（PQ），满足医疗器械法规要求。'; dirty = true; }
  const _galMap = {
    'Multi-cavity Precision Injection Mold — Mirror-polished with HOGU temperature control system':'多腔精密注塑模具——镜面抛光，配备热流道温控系统',
    'Hot Runner Precision Mold — Multi-cavity design with independent thermal control module':'热流道精密模具——多腔设计，独立温控模块',
    'Liquid Silicone Rubber (LSR) Injection Mold — Precision cavity with integrated alignment frame':'液态硅胶（LSR）注塑模具——精密型腔，一体化定位框架',
    'Multi-cavity Slider Mold — Mastip hot runner system, high-gloss mirror finish':'多腔滑块模具——Mastip 热流道系统，高光镜面'
  };
  (DB.moldPage.gallery||[]).forEach(function(g){ if (g.desc && _galMap[g.desc]) { g.desc = _galMap[g.desc]; dirty = true; } });
  const _mpCatMap = {
    'CNC Machining Centers (23 units)':'CNC 加工中心（23 台）',
    'EDM Machines (8 units)':'EDM 电火花机（8 台）',
    'Wire-Cut EDM (7 units)':'线切割（7 台）',
    'Precision Grinders (9 units)':'精密磨床（9 台）',
    'Injection Molding Machines (21 units)':'注塑机（21 台）',
    'Quality Inspection Equipment (8 units)':'品质检测设备（8 台）'
  };
  (DB.moldPage.categories||[]).forEach(function(c){ if (c.title && _mpCatMap[c.title]) { c.title = _mpCatMap[c.title]; dirty = true; } });
  if (dirty) saveData(false);
  } catch(e) { try { console.warn('[migrateDB] skipped due to:', e.message); } catch(_){} }
})();

// ═══════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════

// remember-me: auto-fill on page load
(function(){
  var rm = document.getElementById('login-remember');
  var u = document.getElementById('login-user');
  var p = document.getElementById('login-pass');
  try {
    var saved = JSON.parse(localStorage.getItem('hondvo_remembered'));
    if (saved && saved.checked) {
      u.value = saved.username || '';
      p.value = saved.password || '';
      rm.checked = true;
    }
  } catch(e) {}
})();

(function(){
  var lf = document.getElementById('login-form');
  if (!lf) { console.warn('[login] login-form 元素缺失'); return; }
  lf.addEventListener('submit', function(e){
  e.preventDefault();
  var u = document.getElementById('login-user').value.trim();
  var p = document.getElementById('login-pass').value.trim();
  var rm = document.getElementById('login-remember');
  var err = document.getElementById('login-error');
  if (u === 'admin' && p === 'admin123') {
    err.classList.remove('show');
    // remember-me: save or clear
    if (rm.checked) {
      localStorage.setItem('hondvo_remembered', JSON.stringify({username: u, password: p, checked: true}));
    } else {
      localStorage.removeItem('hondvo_remembered');
    }
    document.getElementById('page-login').style.display = 'none';
    document.getElementById('app-layout').classList.add('active');
    navigateTo('dashboard');
  } else {
    err.classList.add('show');
    // login failed: keep saved credentials if checked
  }
  });
})();

function doLogout() {
  document.getElementById('page-login').style.display = 'flex';
  document.getElementById('app-layout').classList.remove('active');
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-remember').checked = false;
}

// ═══════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('main-content').classList.toggle('expanded');
}

document.querySelectorAll('.nav-item').forEach(item => {
  if (!item || !item.addEventListener) return;
  item.addEventListener('click', function(e){
    e.preventDefault();
    const page = this.dataset.page;
    navigateTo(page);
  });
});

// ═══════════════════════════════════════════
// ROUTING
// ═══════════════════════════════════════════
const pageTitles = {
  dashboard:'数据总览',inquiries:'询盘管理',i18n:'多语言管理',settings:'系统设置',
  // 内容编辑
  'edit-home':'首页编辑',
  'edit-about-who':'关于我们 - 我们是谁','edit-about-values':'关于我们 - 核心价值','edit-about-spirit':'关于我们 - 弘欧精神',
  'edit-about-partners':'关于我们 - 全球合作伙伴','edit-about-cases':'关于我们 - 客户案例','edit-about-team':'关于我们 - 团队',
  'edit-products-page':'产品与服务 - 页面编辑','edit-mold-page':'模具中心 - 页面编辑',
  'edit-products-lsr':'产品与服务 - LSR','edit-products-injection':'产品与服务 - 注塑','edit-products-2k':'产品与服务 - 双色/多色',
  'edit-mold-cnc':'模具中心 - CNC','edit-mold-edm':'模具中心 - EDM','edit-mold-wedm':'模具中心 - 线切割',
  'edit-mold-grinder':'模具中心 - 精密磨床','edit-mold-injection':'模具中心 - 注塑机','edit-mold-qa':'模具中心 - 品质检测',
  'edit-qualifications':'资质证书','edit-qual-env':'生产环境','edit-qual-iqoqpq':'资质实力 - IQ/OQ/PQ',
  'edit-news-content':'新闻动态编辑','edit-contact':'联系我们编辑',
  // 管理入口
  media:'媒体库'
};

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) {
    navItem.classList.add('active');
    const navGroup = navItem.closest('.nav-group');
    if (navGroup) {
      document.querySelectorAll('.nav-group.expanded').forEach(g => g.classList.remove('expanded'));
      navGroup.classList.add('expanded');
    }
  }
  document.getElementById('page-title').textContent = pageTitles[page] || '';
  _currentPage = page;
  updatePublishPanel();
  const mc = document.getElementById('main-content-inner');
  mc.style.opacity = '0'; mc.style.transform = 'translateY(8px)';
  setTimeout(() => {
    mc.innerHTML = renderPage(page);
    attachPageEvents(page);
    mc.style.opacity = '1'; mc.style.transform = 'translateY(0)';
  }, 150);
}

// ═══════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════
function toast(msg, type='success') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => { el.remove(); }, 3000);
}

// ═══════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════
function openModal(title, bodyHTML, onSave) {
  const container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" onclick="closeModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">${bodyHTML}</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">取消</button>
          <button class="btn btn-primary" id="modal-save-btn">保存</button>
        </div>
      </div>
    </div>`;
  document.getElementById('modal-overlay').addEventListener('click', function(e){
    if (e.target === this) closeModal();
  });
  document.getElementById('modal-save-btn').addEventListener('click', onSave);
}
function closeModal() { document.getElementById('modal-container').innerHTML = ''; }

// ═══════════════════════════════════════════
// 通用二次确认弹窗（点击外部或取消均不执行，点确定才执行）
// ═══════════════════════════════════════════
function _hpConfirmDialog(title, msg, onConfirm){
  var container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-overlay" id="_hp-confirm-overlay">
      <div class="modal hp-confirm-modal" style="max-width:420px">
        <div class="modal-header hp-confirm-head">
          <h3>
            <span class="hp-confirm-warn-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </span>
            ${title}
          </h3>
          <button class="modal-close" id="_hp-confirm-x" aria-label="关闭">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body hp-confirm-body">
          <p>${msg}</p>
        </div>
        <div class="modal-footer hp-confirm-foot">
          <button class="btn btn-secondary" id="_hp-confirm-cancel">取消</button>
          <button class="btn btn-confirm-danger" id="_hp-confirm-ok">确认删除</button>
        </div>
      </div>
    </div>`;
  function close(){ container.innerHTML = ''; }
  document.getElementById('_hp-confirm-cancel').onclick = close;
  document.getElementById('_hp-confirm-x').onclick = close;
  document.getElementById('_hp-confirm-ok').onclick = function(){
    close();
    try { onConfirm(); } catch(e) { console.error(e); }
  };
  document.getElementById('_hp-confirm-overlay').onclick = function(e){
    if (e.target === this) close();
  };
}

// ═══════════════════════════════════════════
// PAGE RENDERERS
// ═══════════════════════════════════════════
function renderPage(page) {
  switch(page) {
    case 'dashboard': return renderDashboard();
    case 'inquiries': return renderInquiriesPage();
    case 'media': return renderMediaPage();
    case 'i18n': return renderI18nPage();
    case 'settings': return renderSettingsPage();
    // 内容编辑页面 — 占位
    case 'edit-home': return renderHomepageEditor();
    case 'edit-about-who': return renderAboutWho();
    case 'edit-about-values': return renderAboutValues();
    case 'edit-about-spirit': return renderAboutSpirit();
    case 'edit-about-partners':return renderAboutPartners();
    case 'edit-about-cases': return renderAboutCases();
    case 'edit-about-team': return renderAboutTeam();
    case 'edit-products-page': return renderProductsPage();
    case 'edit-mold-page': return renderMoldPage();
    case 'edit-products-lsr': return renderProductCards('LSR','LSR 液体硅胶产品');
    case 'edit-products-injection': return renderProductCards('PP','注塑产品');
    case 'edit-products-2k': return renderProductCards('2K','双色/多色产品');
    case 'edit-mold-cnc': return renderEquipmentByType('cnc','CNC 数控加工');
    case 'edit-mold-edm': return renderEquipmentByType('edm','EDM 电火花');
    case 'edit-mold-wedm': return renderEquipmentByType('wire','线切割');
    case 'edit-mold-grinder': return renderEquipmentByType('grinder','精密磨床');
    case 'edit-mold-injection': return renderEquipmentByType('injection','注塑机');
    case 'edit-mold-qa': return renderEquipmentByType('qc','品质检测');
    case 'edit-qualifications': return renderCertificateList();
    case 'edit-qual-env': return renderQualEnv();
    case 'edit-qual-iqoqpq': return renderQualIQOQPQ();
    case 'edit-news-content': return renderNewsEditor();
    case 'edit-contact': return renderContact();
    default: return '<p>页面不存在</p>';
  }
}

function renderEditPlaceholder(label) {
  return `<div class="card">
    <div class="card-header"><h3>${label}</h3></div>
    <div class="card-body">
      <div class="empty-state">
        <div class="empty-icon" style="font-size:48px">&#9998;</div>
        <p style="margin-bottom:8px">${label} — 内容编辑模块</p>
        <p style="font-size:12px;color:var(--slate-400)">此模块内容编辑器尚未实现，请等待后续开发。</p>
      </div>
    </div>
  </div>`;
}

function renderDashboard() {
  const products = DB.products.length;
  const newsCount = DB.news.length;
  const unread = DB.inquiries.filter(i=>i.status==='unread').length;
  const totalInq = DB.inquiries.length;
  const certStats = calcCertStats();
  const monthlyStats = calcMonthlyInquiryStats();
  const visits = DB.visits || {today:0,yesterday:0};
  const visitTrend = visits.today >= visits.yesterday ? 'up' : 'down';
  const visitChangePct = visits.yesterday > 0 ? Math.round(Math.abs(visits.today - visits.yesterday) / visits.yesterday * 100) : 0;

  return `
    <div class="stat-grid stat-grid-7">
      <div class="stat-card clickable" onclick="navigateTo('edit-products-lsr')">
        <div class="stat-icon" style="background:var(--brand-soft);color:var(--brand)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        </div>
        <div class="stat-label">产品总数</div>
        <div class="stat-value">${products}</div>
        <div class="stat-sub">已上架 ${DB.products.filter(p=>p.status==='active').length} 个</div>
      </div>
      <div class="stat-card clickable" onclick="navigateTo('edit-news-content')">
        <div class="stat-icon" style="background:var(--info-soft);color:var(--info)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
        </div>
        <div class="stat-label">新闻文章</div>
        <div class="stat-value">${newsCount}</div>
        <div class="stat-sub">已发布 ${DB.news.filter(n=>n.status==='published').length} 篇</div>
      </div>
      <div class="stat-card clickable" onclick="navigateTo('inquiries')">
        <div class="stat-icon" style="background:var(--warning-soft);color:var(--warning)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div class="stat-label">未读询盘</div>
        <div class="stat-value" id="stat-inq-unread">${unread}</div>
        <div class="stat-sub" id="stat-inq-sub">共 ${totalInq} 条询盘</div>
      </div>
      <div class="stat-card clickable" onclick="navigateTo('edit-about-partners')">
        <div class="stat-icon" style="background:var(--success-soft);color:var(--success)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <div class="stat-label">合作伙伴</div>
        <div class="stat-value">${DB.partners.length}</div>
        <div class="stat-sub">覆盖 ${[...new Set(DB.partners.map(p=>p.country))].length} 个国家</div>
      </div>
      <div class="stat-card" id="stat-visits-card">
        <div class="stat-icon" style="background:#EEF2FF;color:#6366F1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div class="stat-label">今日访问</div>
        <div class="stat-value" id="stat-visits-value">${visits.today}</div>
        <div class="stat-sub" id="stat-visits-sub">${visitTrend==='up'?'&#8593;':'&#8595;'} ${visitChangePct}% 较昨日</div>
      </div>
      <div class="stat-card clickable" onclick="navigateTo('edit-qualifications')">
        <div class="stat-icon" style="background:${certStats.expiring>0?'var(--warning-soft)':certStats.expired>0?'var(--danger-soft)':'var(--success-soft)'};color:${certStats.expiring>0?'var(--warning)':certStats.expired>0?'var(--danger)':'var(--success)'}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
        </div>
        <div class="stat-label">证书状态</div>
        <div class="stat-value">${certStats.total}</div>
        <div class="stat-sub">
          正常 ${certStats.normal} / ${certStats.expiring>0?'<span style="color:var(--warning);font-weight:600">即将到期 '+certStats.expiring+'</span>':'即将到期 0'} / ${certStats.expired>0?'<span style="color:var(--danger);font-weight:600">已过期 '+certStats.expired+'</span>':'已过期 0'}
          ${certStats.nearest?`<br><span style="font-size:11px;color:var(--slate-400)">最近到期：${certStats.nearest.name}（${certStats.nearest.dateEnd}）</span>`:''}
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#FDF2F8;color:#EC4899">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="6" y1="8" x2="10" y2="8"/><line x1="6" y1="12" x2="14" y2="12"/><line x1="6" y1="16" x2="18" y2="16"/></svg>
        </div>
        <div class="stat-label">本月询盘</div>
        <div class="stat-value">${monthlyStats.thisMonth}</div>
        <div class="stat-sub">${monthlyStats.mom>=0?'&#8593;':'&#8595;'} ${Math.abs(monthlyStats.mom)}% 环比上月（${monthlyStats.lastMonth}条）</div>
      </div>
    </div>
    <div class="dash-row">
      <div class="card">
        <div class="card-header">
          <h3>询盘趋势</h3>
          <div class="chart-tabs" id="chart-tabs">
            <button class="chart-tab active" data-range="7" onclick="switchChartRange(7,this)">近 7 天</button>
            <button class="chart-tab" data-range="30" onclick="switchChartRange(30,this)">近 30 天</button>
            <button class="chart-tab" data-range="90" onclick="switchChartRange(90,this)">近 90 天</button>
          </div>
        </div>
        <div class="card-body">
          <canvas id="inquiryChart" style="width:100%;height:300px"></canvas>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>待办事项</h3></div>
        <div class="card-body" id="todo-list">${renderTodoList()}</div>
      </div>
    </div>
    <div class="dash-row">
      <div class="card">
        <div class="card-header">
          <h3>访问趋势</h3>
          <div class="chart-tabs" id="visit-trend-tabs">
            <button class="chart-tab active" data-days="7" onclick="switchVisitTrend(7,this)">近 7 天</button>
            <button class="chart-tab" data-days="30" onclick="switchVisitTrend(30,this)">近 30 天</button>
          </div>
        </div>
        <div class="card-body">
          <div class="empty-state" id="visit-trend-empty" style="display:none">
            <p style="font-size:12px;color:var(--slate-400)">暂无访问数据，前端接入埋点后自动统计。</p>
          </div>
          <canvas id="visitTrendChart" style="width:100%;height:260px"></canvas>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>热门搜索 &amp; 地区分布</h3></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:16px">
          <div id="search-terms-box">
            <div style="font-size:12px;font-weight:600;color:var(--slate-500);margin-bottom:8px">搜索词 TOP 10</div>
            <div class="search-terms" id="search-terms-list">
              <div style="font-size:12px;color:var(--slate-400)">暂无搜索数据</div>
            </div>
          </div>
          <div id="geo-box">
            <div style="font-size:12px;font-weight:600;color:var(--slate-500);margin-bottom:8px">访客地区 TOP 10</div>
            <div class="geo-list" id="geo-list">
              <div style="font-size:12px;color:var(--slate-400)">暂无地区数据</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dash-row">
      <div class="card">
        <div class="card-header"><h3>页面访问排行</h3></div>
        <div class="card-body" style="padding:0">
          <div class="table-wrap">
            <table>
              <thead><tr><th>#</th><th>页面名称</th><th>浏览量(PV)</th><th>独立访客</th><th>平均停留</th></tr></thead>
              <tbody id="page-rank-tbody">
                ${DB.pageAnalytics.sort((a,b)=>b.views-a.views).map((p,i)=>`
                  <tr>
                    <td style="font-weight:600;color:var(--slate-400)">${i+1}</td>
                    <td style="font-weight:600">${esc(p.page)}</td>
                    <td>${p.views.toLocaleString()}</td>
                    <td>${p.uniqueVisitors !== undefined ? p.uniqueVisitors.toLocaleString() : '-'}</td>
                    <td>${esc(p.avgTime||p.avgDuration||'-')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>最近询盘</h3></div>
        <div class="card-body" style="padding:0">
          <div class="table-wrap">
            <table>
              <thead><tr><th>客户</th><th>公司</th><th>日期</th><th>状态</th></tr></thead>
              <tbody id="dash-recent-inq">
                ${DB.inquiries.slice(0,5).map(i=>`
                  <tr>
                    <td style="font-weight:600">${esc(i.name)}</td>
                    <td style="color:var(--slate-500);font-size:12px">${esc(i.company.substring(0,20))}${i.company.length>20?'...':''}</td>
                    <td>${i.date}</td>
                    <td>${statusBadge(i.status)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════
// DASHBOARD HELPERS
// ═══════════════════════════════════════════

function calcCertStats() {
  const certs = DB.certificates;
  const today = new Date(); today.setHours(0,0,0,0);
  let normal = 0, expiring = 0, expired = 0, nearest = null;
  const EXPIRING_DAYS = 30;

  certs.forEach(c => {
    const parts = c.date.split('~');
    if (parts.length < 2) { normal++; return; }
    const endStr = parts[1].trim();
    const endDate = new Date(endStr);
    if (isNaN(endDate.getTime())) { normal++; return; }
    const daysLeft = Math.ceil((endDate - today) / (1000*60*60*24));
    
    if (daysLeft < 0) expired++;
    else if (daysLeft <= EXPIRING_DAYS) expiring++;
    else normal++;

    if (!isNaN(endDate.getTime()) && (!nearest || endDate < nearest.endDateObj)) {
      nearest = {name:c.name, dateEnd:endStr, daysLeft:daysLeft, endDateObj:endDate};
    }
  });

  return {total:certs.length, normal, expiring, expired, nearest};
}

function calcMonthlyInquiryStats() {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  let thisMonthCount = 0, lastMonthCount = 0;

  DB.inquiries.forEach(i => {
    const d = new Date(i.date);
    if (isNaN(d.getTime())) return;
    if (d.getFullYear() === thisYear && d.getMonth() === thisMonth) thisMonthCount++;
    else if (d.getFullYear() === thisYear && d.getMonth() === thisMonth - 1) lastMonthCount++;
    else {
      const prevYear = thisMonth === 0 ? thisYear - 1 : thisYear;
      const prevMonth = thisMonth === 0 ? 11 : thisMonth - 1;
      if (d.getFullYear() === prevYear && d.getMonth() === prevMonth) lastMonthCount++;
    }
  });

  const mom = lastMonthCount > 0 ? Math.round((thisMonthCount - lastMonthCount) / lastMonthCount * 100) : (thisMonthCount > 0 ? 100 : 0);
  return {thisMonth:thisMonthCount, lastMonth:lastMonthCount, mom};
}

function getInquiryTrendData(days) {
  const today = new Date(); today.setHours(0,0,0,0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - days + 1);
  
  const dateMap = {};
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0,10);
    dateMap[key] = 0;
  }

  DB.inquiries.forEach(i => {
    const key = i.date;
    if (dateMap.hasOwnProperty(key)) dateMap[key]++;
  });

  const labels = [], values = [];
  for (const [k,v] of Object.entries(dateMap).sort()) {
    labels.push(k.slice(5));
    values.push(v);
  }
  return {labels, values};
}

function renderTodoList() {
  const todos = [];
  const unreadCount = DB.inquiries.filter(i=>i.status==='unread').length;
  const draftNews = DB.news.filter(n=>n.status==='draft').length;
  const certStats = calcCertStats();
  
  if (unreadCount > 0) todos.push({icon:'📩',text:`${unreadCount} 条询盘待处理`,color:'var(--warning)'});
  if (draftNews > 0) todos.push({icon:'📝',text:`${draftNews} 篇新闻草稿待发布`,color:'var(--info)'});
  if (certStats.expiring > 0) todos.push({icon:'⚠️',text:`${certStats.expiring} 项证书即将到期`,color:'var(--warning)'});
  if (certStats.expired > 0) todos.push({icon:'🔴',text:`${certStats.expired} 项证书已过期`,color:'var(--danger)'});
  if (todos.length === 0) todos.push({icon:'✅',text:'系统运行正常，所有模块可用',color:'var(--success)'});
  todos.push({icon:'📊',text:'本月新增数据统计已更新',color:'var(--slate-500)'});

  return `<div style="display:flex;flex-direction:column;gap:12px">
    ${todos.map(t=>`
      <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:var(--slate-50);font-size:13px">
        <span style="font-size:18px">${t.icon}</span>
        <span style="color:${t.color}">${t.text}</span>
      </div>
    `).join('')}
  </div>`;
}

let inquiryChartInstance = null;

function initInquiryChart(days) {
  const canvas = document.getElementById('inquiryChart');
  if (!canvas) return;
  if (inquiryChartInstance) inquiryChartInstance.destroy();
  const ctx = canvas.getContext('2d');
  const data = getInquiryTrendData(days);
  inquiryChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: '询盘量',
        data: data.values,
        borderColor: '#E16B24',
        backgroundColor: 'rgba(225,107,36,0.08)',
        fill: true,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: '#E16B24',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#334155',
          bodyColor: '#475569',
          borderColor: '#E2E8F0',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: { title: function(ctx) { return ctx[0].label; }, label: function(ctx) { return ctx.raw + ' 条询盘'; } }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 11 }, maxTicksLimit: 10 } },
        y: { beginAtZero: true, grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 11 }, stepSize: 1 } }
      }
    }
  });
}

function switchChartRange(days, btn) {
  document.querySelectorAll('#chart-tabs .chart-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  initInquiryChart(days);
}

// ═══════════════════════════════════════════
// DASHBOARD — 真实分析数据（Phase 3）
// ═══════════════════════════════════════════
let _visitTrendChart = null;
let _visitTrendRaw = [];      // 服务器返回的原始趋势数组（含 date/count）

// 页面路径 → 中文名映射
const _PAGE_NAME_MAP = {
  '/': '首页', '/index.html': '首页', '/#/': '首页',
  '/about': '关于我们', '/about/': '关于我们',
  '/products': '产品与服务', '/products/': '产品与服务',
  '/mold': '模具中心', '/mold/': '模具中心',
  '/qualifications': '资质实力', '/qualifications/': '资质实力',
  '/news': '新闻动态', '/news/': '新闻动态',
  '/contact': '联系我们', '/contact/': '联系我们',
  '__search__': '站内搜索'
};
function _pageName(p) {
  return _PAGE_NAME_MAP[p] || (p ? p.replace(/^\/|\/$/g, '') || '首页' : '首页');
}

// 从后端拉取分析数据并刷新数据总览
function _loadDashboardAnalytics() {
  var API = '/api/analytics/dashboard';
  fetch(API, { headers: { 'Accept': 'application/json' } })
  .then(function(r){ return r.json(); })
  .then(function(d){
    if (!d.success) throw new Error(d.error || 'unknown');
    _renderAnalyticsData(d);
  })
  .catch(function(e){
    // 后端未启动：保留本地兜底数据，静默降级
    console.log('[Dashboard] 分析服务未连接，使用本地数据 (' + e.message + ')');
  });
}

function _renderAnalyticsData(d) {
  // 1) 今日/昨日访问
  var visEl = document.getElementById('stat-visits-value');
  var visSubEl = document.getElementById('stat-visits-sub');
  if (visEl && visSubEl) {
    var t = d.visits.today, y = d.visits.yesterday;
    visEl.textContent = t.toLocaleString();
    var diff = y > 0 ? Math.round(Math.abs(t - y) / y * 100) : (t > 0 ? 100 : 0);
    var arrow = t >= y ? '&#8593;' : '&#8595;';
    visSubEl.innerHTML = arrow + ' ' + diff + '% 较昨日' + (d.totalPageviews ? ' · 总PV ' + d.totalPageviews.toLocaleString() : '');
  }

  // 2) 访问趋势
  _visitTrendRaw = (d.trend || []).map(function(r){ return { date: r.date, count: Number(r.count) }; });
  _initVisitTrendChart(7);

  // 3) 热门搜索词
  var terms = (d.search && d.search.topTerms) || [];
  var sBox = document.getElementById('search-terms-list');
  if (sBox) {
    if (terms.length === 0) {
      sBox.innerHTML = '<div style="font-size:12px;color:var(--slate-400)">暂无搜索数据</div>';
    } else {
      var max = Math.max.apply(null, terms.map(function(x){return x.count;})) || 1;
      sBox.innerHTML = terms.map(function(x){
        var w = Math.round(x.count / max * 100);
        return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
          '<span style="font-size:12px;color:var(--slate-600);min-width:0;flex:0 0 120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(x.term) + '</span>' +
          '<div style="flex:1;height:6px;border-radius:3px;background:var(--slate-100)"><div style="width:' + w + '%;height:100%;border-radius:3px;background:var(--brand)"></div></div>' +
          '<span style="font-size:11px;color:var(--slate-400);min-width:24px;text-align:right">' + x.count + '</span></div>';
      }).join('');
    }
  }

  // 4) 访客地区分布
  var geo = d.geo || [];
  var gBox = document.getElementById('geo-list');
  if (gBox) {
    if (geo.length === 0) {
      gBox.innerHTML = '<div style="font-size:12px;color:var(--slate-400)">暂无地区数据</div>';
    } else {
      var gmax = Math.max.apply(null, geo.map(function(x){return x.count;})) || 1;
      gBox.innerHTML = geo.slice(0,10).map(function(x){
        var w = Math.round(x.count / gmax * 100);
        var label = x.country || '未知';
        if (x.region && x.region !== x.country) label += ' · ' + x.region;
        return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
          '<span style="font-size:12px;color:var(--slate-600);flex:0 0 110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(label) + '</span>' +
          '<div style="flex:1;height:6px;border-radius:3px;background:var(--slate-100)"><div style="width:' + w + '%;height:100%;border-radius:3px;background:#6366F1"></div></div>' +
          '<span style="font-size:11px;color:var(--slate-400);min-width:24px;text-align:right">' + x.count + '</span></div>';
      }).join('');
    }
  }

  // 5) 页面访问排行
  var pages = d.pages || [];
  var tb = document.getElementById('page-rank-tbody');
  if (tb && pages.length > 0) {
    tb.innerHTML = pages.map(function(p,i){
      return '<tr>' +
        '<td style="font-weight:600;color:var(--slate-400)">' + (i+1) + '</td>' +
        '<td style="font-weight:600">' + esc(_pageName(p.page)) + '</td>' +
        '<td>' + Number(p.views).toLocaleString() + '</td>' +
        '<td>' + (p.uniqueVisitors != null ? Number(p.uniqueVisitors).toLocaleString() : '-') + '</td>' +
        '<td>' + esc(p.avgDuration || '-') + '</td></tr>';
    }).join('');
  }

  // 6) 询盘统计（服务器为准）
  var iq = d.inquiries || {};
  var iqUnread = document.getElementById('stat-inq-unread');
  var iqSub = document.getElementById('stat-inq-sub');
  if (iqUnread) iqUnread.textContent = iq.unread || 0;
  if (iqSub) iqSub.textContent = '共 ' + (iq.total || 0) + ' 条询盘';
}

// 访问趋势图表
function _initVisitTrendChart(days) {
  var canvas = document.getElementById('visitTrendChart');
  if (!canvas) return;
  if (_visitTrendChart) _visitTrendChart.destroy();

  var rows = _visitTrendRaw.slice(-days);
  var emptyEl = document.getElementById('visit-trend-empty');
  if (rows.length === 0) {
    if (emptyEl) emptyEl.style.display = '';
    canvas.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  canvas.style.display = '';

  var labels = rows.map(function(r){
    var p = r.date.split('-');
    return p[1] + '/' + p[2];
  });
  var values = rows.map(function(r){ return r.count; });

  var ctx = canvas.getContext('2d');
  _visitTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '访问量',
        data: values,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99,102,241,0.08)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#6366F1',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#334155',
          bodyColor: '#475569',
          borderColor: '#E2E8F0',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: { label: function(ctx){ return ctx.raw + ' 次访问'; } }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 11 }, maxTicksLimit: 10 } },
        y: { beginAtZero: true, grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 11 }, stepSize: 1 } }
      }
    }
  });
}

function switchVisitTrend(days, btn) {
  document.querySelectorAll('#visit-trend-tabs .chart-tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  _initVisitTrendChart(days);
}

// ═══════════════════════════════════════════
// DASHBOARD HELPERS END
// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// INQUIRIES
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
// INQUIRIES（Phase 5：服务器数据为准，本地降级）
// ═══════════════════════════════════════════
let _inq = { mode:'local', items:[], total:0, page:1, pageSize:20, q:'', status:'' };

function _inqApi(path, opts) {
  return fetch('/api' + path, opts || {}).then(function(r){ return r.json(); });
}

// 服务器 ISO 时间 → 显示格式
function _fmtInqDate(iso) {
  if (!iso) return '';
  var d = new Date(iso);
  if (isNaN(d.getTime())) return String(iso);
  var p = function(n){ return (n<10?'0':'')+n; };
  return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes());
}
function _inqStatusLabel(s){ return s==='unread'?'未读':s==='read'?'已读':'已回复'; }

function renderInquiriesPage() {
  return `
    <div class="toolbar">
      <div class="search-box">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="搜索客户/公司/邮箱/电话/内容..." value="${esc(_inq.q)}" oninput="filterInquiries(this.value)">
      </div>
      <select class="form-input" style="width:auto;padding:8px 12px" onchange="filterInquiryStatus(this.value)">
        <option value="">全部状态</option>
        <option value="unread"${_inq.status==='unread'?' selected':''}>未读</option>
        <option value="read"${_inq.status==='read'?' selected':''}>已读</option>
        <option value="replied"${_inq.status==='replied'?' selected':''}>已回复</option>
      </select>
      <button class="btn btn-secondary" onclick="_loadInquiries()">刷新</button>
    </div>
    <div class="card">
      <div class="card-body" style="padding:0">
        <div class="table-wrap" id="table-inquiries">
          <div class="empty-state" style="padding:40px"><p style="color:var(--slate-400)">加载中...</p></div>
        </div>
        <div id="inq-pagination"></div>
      </div>
    </div>`;
}

// 从服务器加载询盘（失败降级本地；showToast=false 时静默降级）
function _loadInquiries(showToast) {
  var st = _inq.status ? '&status=' + _inq.status : '';
  var q = _inq.q ? '&q=' + encodeURIComponent(_inq.q) : '';
  var url = '/api/inquiries?page=' + _inq.page + '&pageSize=' + _inq.pageSize + st + q;
  _inqApi(url).then(function(d){
    if (!d.success) throw new Error(d.error || '');
    _inq.mode = 'server';
    _inq.items = d.items;
    _inq.total = d.total;
    _inq.page = d.page;
    _renderInquiryTable();
    _renderDashRecentInq();
  }).catch(function(e){
    console.log('[Inquiry] 后端未连接，使用本地数据 (' + e.message + ')');
    _inq.mode = 'local';
    var data = DB.inquiries.slice();
    if (_inq.status) data = data.filter(function(i){ return i.status === _inq.status; });
    if (_inq.q) {
      var kw = _inq.q.toLowerCase();
      data = data.filter(function(i){
        return (i.name||'').toLowerCase().includes(kw) || (i.company||'').toLowerCase().includes(kw)
          || (i.email||'').toLowerCase().includes(kw) || (i.phone||'').toLowerCase().includes(kw)
          || (i.content||'').toLowerCase().includes(kw);
      });
    }
    _inq.items = data;
    _inq.total = data.length;
    _renderInquiryTable();
    if (showToast) toast('后端未连接，显示本地数据', 'error');
  });
}

function _renderInquiryTable() {
  var el = document.getElementById('table-inquiries');
  var pgEl = document.getElementById('inq-pagination');
  if (!el) return;
  if (_inq.items.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:40px"><p style="color:var(--slate-400)">暂无询盘数据</p></div>';
    if (pgEl) pgEl.innerHTML = '';
    return;
  }
  el.innerHTML = renderInquiryTable(_inq.items);
  if (pgEl) pgEl.innerHTML = _renderInqPagination();
}

function renderInquiryTable(data) {
  return `<table>
    <thead><tr><th>编号</th><th>客户</th><th>公司</th><th>联系方式</th><th>日期</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>${data.map(i=>`
      <tr style="${i.status==='unread'?'background:var(--brand-soft)':''}">
        <td>#${i.id}</td>
        <td style="font-weight:600">${esc(i.name)}</td>
        <td style="font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(i.company)}</td>
        <td style="font-size:12px">${esc(i.email)}<br><span style="color:var(--slate-400)">${esc(i.phone)}</span></td>
        <td style="font-size:12px">${esc(_fmtInqDate(i.created_at) || i.date)}</td>
        <td>${statusBadge(i.status)}</td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="viewInquiry(${i.id})">查看</button>
          <select onchange="updateInquiryStatus(${i.id},this.value)" style="padding:4px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;margin-left:4px">
            <option value="">标记...</option>
            <option value="read">已读</option><option value="replied">已回复</option><option value="unread">未读</option>
          </select>
          <button class="btn btn-ghost btn-sm" style="color:var(--danger);margin-left:4px" onclick="deleteInquiry(${i.id})">删除</button>
        </td>
      </tr>`).join('')}</tbody></table>`;
}

function _renderInqPagination() {
  var totalPages = Math.max(1, Math.ceil(_inq.total / _inq.pageSize));
  var b = [];
  b.push('<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;flex-wrap:wrap;gap:8px;border-top:1px solid var(--slate-100)">');
  b.push('<span style="font-size:12px;color:var(--slate-500)">共 ' + _inq.total + ' 条 · 第 ' + _inq.page + '/' + totalPages + ' 页</span>');
  b.push('<div style="display:flex;align-items:center;gap:4px">');
  b.push('<select style="padding:4px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;margin-right:8px" onchange="changeInquiryPageSize(this.value)">');
  [10,20,50].forEach(function(s){ b.push('<option value="' + s + '"' + (s===_inq.pageSize?' selected':'') + '>' + s + ' 条/页</option>'); });
  b.push('</select>');
  b.push('<button class="btn btn-ghost btn-sm"' + (_inq.page<=1?' disabled':' onclick="gotoInquiryPage(' + (_inq.page-1) + ')"') + '>上一页</button>');
  b.push('<button class="btn btn-ghost btn-sm"' + (_inq.page>=totalPages?' disabled':' onclick="gotoInquiryPage(' + (_inq.page+1) + ')"') + '>下一页</button>');
  b.push('</div></div>');
  return b.join('');
}
function gotoInquiryPage(p) { _inq.page = p; _loadInquiries(); }
function changeInquiryPageSize(s) { _inq.pageSize = parseInt(s,10); _inq.page = 1; _loadInquiries(); }
function filterInquiries(q) { _inq.q = (q||'').trim(); _inq.page = 1; _loadInquiries(); }
function filterInquiryStatus(s) { _inq.status = s||''; _inq.page = 1; _loadInquiries(); }

function viewInquiry(id) {
  const i = _inq.items.find(x=>x.id===id);
  if(!i) return;
  if(i.status==='unread') {
    i.status = 'read';
    if (_inq.mode === 'server') {
      _inqApi('/inquiries/' + id, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status:'read'}) }).catch(function(){});
    } else {
      saveData();
    }
    _renderInquiryTable();
  }
  openModal(`询盘详情 #${i.id}`,
    `<div style="display:flex;flex-direction:column;gap:16px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div><span style="font-size:11px;color:var(--slate-400)">客户</span><div style="font-weight:600">${esc(i.name)}</div></div>
        <div><span style="font-size:11px;color:var(--slate-400)">公司</span><div>${esc(i.company)}</div></div>
        <div><span style="font-size:11px;color:var(--slate-400)">邮箱</span><div>${esc(i.email)}</div></div>
        <div><span style="font-size:11px;color:var(--slate-400)">电话</span><div>${esc(i.phone)}</div></div>
        <div><span style="font-size:11px;color:var(--slate-400)">日期</span><div>${esc(_fmtInqDate(i.created_at) || i.date)}</div></div>
        <div><span style="font-size:11px;color:var(--slate-400)">状态</span><div>${statusBadge(i.status)}</div></div>
        <div><span style="font-size:11px;color:var(--slate-400)">类型</span><div>${esc(i.type||'-')}</div></div>
        <div><span style="font-size:11px;color:var(--slate-400)">来源页面</span><div>${esc(i.page||'-')}</div></div>
      </div>
      <div style="background:var(--slate-50);padding:16px;border-radius:8px;border:1px solid var(--slate-200)">
        <span style="font-size:11px;color:var(--slate-400);display:block;margin-bottom:8px">询盘内容</span>
        <div style="font-size:14px;line-height:1.8;white-space:pre-wrap">${esc(i.content)}</div>
      </div>
    </div>`,
    function(){ closeModal(); }
  );
}
function updateInquiryStatus(id, status) {
  if(!status) return;
  const i = _inq.items.find(x=>x.id===id);
  if(!i) return;
  i.status = status;
  if (_inq.mode === 'server') {
    _inqApi('/inquiries/' + id, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status:status}) })
    .then(function(d){
      if (d.success) { _renderInquiryTable(); toast('询盘状态已更新为"' + _inqStatusLabel(status) + '"'); }
      else { toast('更新失败: ' + d.error, 'error'); }
    })
    .catch(function(){ toast('后端未连接，仅本地更新', 'error'); _renderInquiryTable(); });
  } else {
    saveData();
    _renderInquiryTable();
    toast('询盘状态已更新为"' + _inqStatusLabel(status) + '"');
  }
}
function deleteInquiry(id) {
  const i = _inq.items.find(x=>x.id===id);
  if(!i) return;
  if(!confirm(`确定删除询盘 #${id}（${i.name}）？此操作不可恢复。`)) return;
  if (_inq.mode === 'server') {
    _inqApi('/inquiries/' + id, { method:'DELETE' })
    .then(function(d){
      if (d.success) { toast('已删除询盘 #' + id); _loadInquiries(); }
      else { toast('删除失败: ' + d.error, 'error'); }
    })
    .catch(function(){ toast('后端未连接，删除失败', 'error'); });
  } else {
    DB.inquiries = DB.inquiries.filter(function(x){ return x.id !== id; });
    saveData();
    toast('已删除询盘 #' + id);
    _loadInquiries();
  }
}

// 用服务器询盘数据刷新数据总览的「最近询盘」
function _renderDashRecentInq() {
  var tb = document.getElementById('dash-recent-inq');
  if (!tb || _inq.mode !== 'server' || _inq.items.length === 0) return;
  tb.innerHTML = _inq.items.slice(0,5).map(function(i){
    return '<tr>' +
      '<td style="font-weight:600">' + esc(i.name) + '</td>' +
      '<td style="color:var(--slate-500);font-size:12px">' + esc((i.company||'').substring(0,20)) + ((i.company||'').length>20?'...':'') + '</td>' +
      '<td>' + esc(_fmtInqDate(i.created_at)) + '</td>' +
      '<td>' + statusBadge(i.status) + '</td></tr>';
  }).join('');
}

// ═══════════════════════════════════════════
// I18N
// ═══════════════════════════════════════════
let i18nSearchKey = '';
let i18nEditLang = 'zh';

function renderI18nPage() {
  const data = DB.i18n;
  return `
    <div class="toolbar">
      <div class="search-box">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="搜索键名或翻译值..." oninput="filterI18n(this.value)">
      </div>
      <select class="form-input" style="width:auto;padding:8px 12px" onchange="i18nEditLang=this.value;filterI18n(i18nSearchKey)">
        <option value="zh">简体中文</option><option value="en">English</option><option value="de">Deutsch</option><option value="ja">日本語</option>
      </select>
      <button class="btn btn-primary" onclick="addI18nKey()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        新增键名
      </button>
      <button class="btn btn-secondary" onclick="exportI18n()">导出 JSON</button>
    </div>
    <div class="card">
      <div class="card-body" style="padding:0">
        <div id="i18n-list">
          ${renderI18nList(data)}
        </div>
      </div>
    </div>`;
}
function renderI18nList(data) {
  return data.map(item => `
    <div class="i18n-row">
      <div class="i18n-key">${esc(item.key)}</div>
      <div class="i18n-values">
        <div class="i18n-val">
          <span class="lang-tag">${i18nEditLang}</span>
          <input value="${esc(item[i18nEditLang]||'')}" onchange="updateI18nValue('${item.key}','${i18nEditLang}',this.value)" placeholder="输入翻译...">
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="deleteI18nKey('${item.key}')">删除</button>
    </div>`).join('');
}
function filterI18n(q) {
  i18nSearchKey = q;
  const kw = q.toLowerCase();
  const data = DB.i18n.filter(item => 
    !kw || item.key.toLowerCase().includes(kw) || (item[i18nEditLang]||'').toLowerCase().includes(kw)
  );
  document.getElementById('i18n-list').innerHTML = renderI18nList(data);
}
function updateI18nValue(key, lang, value) {
  const item = DB.i18n.find(x=>x.key===key);
  if(item){ item[lang]=value; saveData(); }
}
function addI18nKey() {
  const key = prompt('请输入新键名（英文，如 nav_services）：');
  if(!key||!key.trim()) return;
  if(DB.i18n.find(x=>x.key===key.trim())){ toast('键名已存在','error'); return; }
  DB.i18n.push({key:key.trim(),zh:'',en:'',de:'',ja:''});
  saveData();
  navigateTo('i18n');
  toast('新键名已添加');
}
function deleteI18nKey(key) {
  if(!confirm(`确定要删除键名 "${key}" 吗？`)) return;
  DB.i18n = DB.i18n.filter(x=>x.key!==key);
  saveData();
  navigateTo('i18n');
  toast('键名已删除');
}
function exportI18n() {
  const obj = {};
  DB.i18n.forEach(item => { obj[item.key] = {zh:item.zh||'',en:item.en||'',de:item.de||'',ja:item.ja||''}; });
  const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'hondvo_i18n.json'; a.click();
  URL.revokeObjectURL(url);
  toast('语言包已导出');
}

// ═══════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════
function renderSettingsPage() {
  const s = DB.settings;
  return `
    <div class="card">
      <div class="card-header"><h3>网站基础设置</h3></div>
      <div class="card-body">
        <form id="settings-form" onsubmit="saveSettings(event)">
          <div class="form-inline">
            <div class="form-group form-group-full"><label>网站名称</label><input class="form-input" name="siteName" value="${esc(s.siteName)}"></div>
            <div class="form-group form-group-full"><label>Logo 链接</label><input class="form-input" name="logo" value="${esc(s.logo)}" placeholder="https://..."></div>
            <div class="form-group form-group-full"><label>SEO 标题</label><input class="form-input" name="seoTitle" value="${esc(s.seoTitle)}"></div>
            <div class="form-group form-group-full"><label>SEO 描述</label><textarea class="form-input" name="seoDesc">${esc(s.seoDesc)}</textarea></div>
          </div>
          <h4 style="margin:24px 0 12px;font-size:14px;color:var(--slate-600)">联系方式</h4>
          <div class="form-inline">
            <div class="form-group"><label>电话</label><input class="form-input" name="contactPhone" value="${esc(s.contactPhone)}"></div>
            <div class="form-group"><label>邮箱</label><input class="form-input" name="contactEmail" value="${esc(s.contactEmail)}"></div>
            <div class="form-group form-group-full"><label>地址</label><input class="form-input" name="contactAddress" value="${esc(s.contactAddress)}"></div>
          </div>
          <div style="margin-top:24px">
            <button type="submit" class="btn btn-primary">保存设置</button>
            <button type="button" class="btn btn-secondary" style="margin-left:8px" onclick="resetSettings()">恢复默认</button>
          </div>
        </form>
      </div>
    </div>`;
}
function saveSettings(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  for(let[k,v] of fd.entries()) DB.settings[k]=v;
  saveData();
  toast('设置已保存');
}
function resetSettings() {
  if(!confirm('确定要恢复默认设置吗？当前设置将丢失。')) return;
  DB.settings = JSON.parse(JSON.stringify(DEFAULT_DB.settings));
  saveData();
  navigateTo('settings');
  toast('设置已恢复默认');
}

// ═══════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════
function esc(s) { if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function statusBadge(s) {
  if(s==='unread') return '<span class="badge badge-warning">未读</span>';
  if(s==='read') return '<span class="badge badge-info">已读</span>';
  if(s==='replied') return '<span class="badge badge-success">已回复</span>';
  return '';
}


// ═══════════════════════════════════════════
// LABEL MAPPINGS
// ═══════════════════════════════════════════
const CAT_LABELS = {'LSR':'LSR 液体硅胶', 'PP':'注塑', '2K':'双色/多色'};
const TYPE_LABELS = {'cnc':'CNC 数控加工', 'edm':'EDM 电火花', 'wire':'线切割', 'grinder':'精密磨床', 'injection':'注塑机', 'qc':'品质检测'};
const PRODUCT_STATUS_LABELS = {'active':'上架', 'draft':'草稿', 'inactive':'下架'};

// ═══════════════════════════════════════════
// PRODUCT CARDS BY CATEGORY
// ═══════════════════════════════════════════
function renderProductCards(cat, title) {
  const products = DB.products.filter(p => p.cat === cat);
  const statusBadge = s => {
    const map = {active:'badge-success',draft:'badge-warning',inactive:'badge-danger'};
    return `<span class="badge ${map[s]||'badge-secondary'}">${PRODUCT_STATUS_LABELS[s]||s}</span>`;
  };
  const rows = products.map(p => `
    <div class="data-card">
      <div class="data-card-header">
        <span class="data-card-title">${escHtml(p.name)}</span>
        ${statusBadge(p.status)}
      </div>
      <div class="data-card-body">
        <div class="data-card-field"><span class="field-label">分类</span><span class="badge badge-primary badge-sm">${CAT_LABELS[p.cat]||p.cat}</span></div>
        <div class="data-card-field"><span class="field-label">描述</span><span>${escHtml(p.desc||'—')}</span></div>
        <div class="data-card-field"><span class="field-label">规格</span><span>${escHtml(p.specs||'—')}</span></div>
      </div>
      <div class="data-card-footer">
        <button class="btn btn-sm btn-primary" onclick="editProduct(${p.id})">编辑</button>
        <button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}" onclick="deleteProduct(${p.id})">删除</button>
      </div>
    </div>
  `).join('');

  return `<div class="card">
    <div class="card-header"><h3>${title}</h3><span class="card-count">共 ${products.length} 款产品</span></div>
    <div class="card-body">
      ${products.length ? `<div class="data-card-grid">${rows}</div>` : `<div class="empty-state"><p>暂无 ${title} 产品数据</p></div>`}
    </div>
  </div>`;
}

function editProduct(id) {
  const p = DB.products.find(x => x.id === id);
  if (!p) return;
  openModal('编辑产品',
    `<div class="form-group"><label>产品名称</label><input class="form-input" id="ep-name" value="${escHtml(p.name)}"></div>
     <div class="form-group"><label>分类</label><select class="form-input" id="ep-cat">
       <option value="LSR" ${p.cat==='LSR'?'selected':''}>LSR 液体硅胶</option>
       <option value="PP" ${p.cat==='PP'?'selected':''}>注塑</option>
       <option value="2K" ${p.cat==='2K'?'selected':''}>双色/多色</option>
     </select></div>
     <div class="form-group"><label>描述</label><textarea class="form-input" id="ep-desc" rows="2">${escHtml(p.desc||'')}</textarea></div>
     <div class="form-group"><label>规格</label><input class="form-input" id="ep-specs" value="${escHtml(p.specs||'')}"></div>
     <div class="form-group"><label>状态</label><select class="form-input" id="ep-status">
       <option value="active" ${p.status==='active'?'selected':''}>上架</option>
       <option value="draft" ${p.status==='draft'?'selected':''}>草稿</option>
       <option value="inactive" ${p.status==='inactive'?'selected':''}>下架</option>
     </select></div>`,
    function(){
      p.name = document.getElementById('ep-name').value.trim();
      p.cat = document.getElementById('ep-cat').value;
      p.desc = document.getElementById('ep-desc').value.trim();
      p.specs = document.getElementById('ep-specs').value.trim();
      p.status = document.getElementById('ep-status').value;
      saveData(); closeModal();
      document.getElementById('main-content-inner').innerHTML = renderProductCards(p.cat, CAT_LABELS[p.cat]||p.cat);
      toast('产品已更新');
    }
  );
}

function deleteProduct(id) {
  const idx = DB.products.findIndex(x => x.id === id);
  if (idx === -1) return;
  const p = DB.products[idx];
  const catLabel = CAT_LABELS[p.cat] || p.cat;
  DB.products.splice(idx, 1);
  saveData();
  document.getElementById('main-content-inner').innerHTML = renderProductCards(p.cat, catLabel);
  toast('产品已删除');
}

// ═══════════════════════════════════════════
// EQUIPMENT BY TYPE
// ═══════════════════════════════════════════
function renderEquipmentByType(type, title) {
  const equipment = DB.equipment.filter(e => e.type === type);
  const statusBadge = s => {
    const map = {'运行中':'badge-success','维修中':'badge-warning','停机':'badge-danger','调试中':'badge-info'};
    return `<span class="badge ${map[s]||'badge-secondary'}">${s}</span>`;
  };
  const rows = equipment.map(e => `
    <div class="data-card">
      <div class="data-card-header">
        <span class="data-card-title">${escHtml(e.name)}</span>
        ${statusBadge(e.status)}
      </div>
      <div class="data-card-body">
        <div class="data-card-field"><span class="field-label">型号</span><span>${escHtml(e.model||'—')}</span></div>
        <div class="data-card-field"><span class="field-label">类型</span><span class="badge badge-primary badge-sm">${TYPE_LABELS[e.type]||e.type}</span></div>
        <div class="data-card-field"><span class="field-label">数量</span><span>${e.qty||0} 台</span></div>
        <div class="data-card-field"><span class="field-label">规格</span><span>${escHtml(e.specs||'—')}</span></div>
        <div class="data-card-field"><span class="field-label">位置</span><span>${escHtml(e.location||'—')}</span></div>
      </div>
      <div class="data-card-footer">
        <button class="btn btn-sm btn-primary" onclick="editEquipment(${e.id})">编辑</button>
        <button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}" onclick="deleteEquipment(${e.id})">删除</button>
      </div>
    </div>
  `).join('');

  return `<div class="card">
    <div class="card-header"><h3>${title}</h3><span class="card-count">共 ${equipment.length} 台设备</span></div>
    <div class="card-body">
      ${equipment.length ? `<div class="data-card-grid">${rows}</div>` : `<div class="empty-state"><p>暂无 ${title} 设备数据</p></div>`}
    </div>
  </div>`;
}

function editEquipment(id) {
  const e = DB.equipment.find(x => x.id === id);
  if (!e) return;
  openModal('编辑设备',
    `<div class="form-group"><label>设备名称</label><input class="form-input" id="ee-name" value="${escHtml(e.name)}"></div>
     <div class="form-group"><label>型号</label><input class="form-input" id="ee-model" value="${escHtml(e.model||'')}"></div>
     <div class="form-group"><label>类型</label><select class="form-input" id="ee-type">
       <option value="cnc" ${e.type==='cnc'?'selected':''}>CNC 数控加工</option>
       <option value="edm" ${e.type==='edm'?'selected':''}>EDM 电火花</option>
       <option value="wire" ${e.type==='wire'?'selected':''}>线切割</option>
       <option value="grinder" ${e.type==='grinder'?'selected':''}>精密磨床</option>
       <option value="injection" ${e.type==='injection'?'selected':''}>注塑机</option>
       <option value="qc" ${e.type==='qc'?'selected':''}>品质检测</option>
     </select></div>
     <div class="form-group"><label>数量</label><input class="form-input" id="ee-qty" type="number" value="${e.qty||1}"></div>
     <div class="form-group"><label>状态</label><select class="form-input" id="ee-status">
       <option value="运行中" ${e.status==='运行中'?'selected':''}>运行中</option>
       <option value="维修中" ${e.status==='维修中'?'selected':''}>维修中</option>
       <option value="停机" ${e.status==='停机'?'selected':''}>停机</option>
       <option value="调试中" ${e.status==='调试中'?'selected':''}>调试中</option>
     </select></div>
     <div class="form-group"><label>规格</label><input class="form-input" id="ee-specs" value="${escHtml(e.specs||'')}"></div>
     <div class="form-group"><label>位置</label><input class="form-input" id="ee-location" value="${escHtml(e.location||'')}"></div>`,
    function(){
      e.name = document.getElementById('ee-name').value.trim();
      e.model = document.getElementById('ee-model').value.trim();
      e.type = document.getElementById('ee-type').value;
      e.qty = parseInt(document.getElementById('ee-qty').value)||1;
      e.status = document.getElementById('ee-status').value;
      e.specs = document.getElementById('ee-specs').value.trim();
      e.location = document.getElementById('ee-location').value.trim();
      saveData(); closeModal();
      document.getElementById('main-content-inner').innerHTML = renderEquipmentByType(e.type, TYPE_LABELS[e.type]||e.type);
      toast('设备已更新');
    }
  );
}

function deleteEquipment(id) {
  const idx = DB.equipment.findIndex(x => x.id === id);
  if (idx === -1) return;
  const e = DB.equipment[idx];
  const typeLabel = TYPE_LABELS[e.type] || e.type;
  DB.equipment.splice(idx, 1);
  saveData();
  document.getElementById('main-content-inner').innerHTML = renderEquipmentByType(e.type, typeLabel);
  toast('设备已删除');
}

// ═══════════════════════════════════════════
// CERTIFICATE LIST
// ═══════════════════════════════════════════
function renderCertificateList() {
  const certs = DB.certificates;
  const now = new Date();
  const certStatus = c => {
    if (!c.date) return 'badge-secondary';
    const parts = c.date.split('~');
    if (parts.length < 2) return 'badge-secondary';
    const endDate = new Date(parts[1].trim());
    if (isNaN(endDate.getTime())) return 'badge-secondary';
    const monthsLeft = (endDate - now) / (1000*60*60*24*30);
    if (endDate < now) return 'badge-danger';
    if (monthsLeft <= 3) return 'badge-warning';
    return 'badge-success';
  };
  const certStatusText = c => {
    if (!c.date) return '未知';
    const parts = c.date.split('~');
    if (parts.length < 2) return '未知';
    const endDate = new Date(parts[1].trim());
    if (isNaN(endDate.getTime())) return '未知';
    if (endDate < now) return '已过期';
    const monthsLeft = Math.round((endDate - now) / (1000*60*60*24*30));
    return monthsLeft <= 3 ? `${monthsLeft}个月后到期` : '有效';
  };

  const rows = certs.map(c => `
    <div class="data-card">
      <div class="data-card-header">
        <span class="data-card-title">${escHtml(c.name)}</span>
        <span class="badge ${certStatus(c)}">${certStatusText(c)}</span>
      </div>
      <div class="data-card-body">
        <div class="data-card-field"><span class="field-label">认证机构</span><span>${escHtml(c.body||'—')}</span></div>
        <div class="data-card-field"><span class="field-label">证书编号</span><span>${escHtml(c.number||'—')}</span></div>
        <div class="data-card-field"><span class="field-label">有效期</span><span>${escHtml(c.date||'—')}</span></div>
      </div>
    </div>
  `).join('');

  const q = DB.qual || {};
  return `<div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>资质实力 — 页面 Banner</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('qc-banner-title','Banner 标题',q.bannerTitle||'','页面顶部大标题，如"资质认证"')}
        ${_hpField('qc-banner-sub','Banner 副标题',q.bannerSub||'','Banner 下方简介文字，如"国际标准认证 · 十万级洁净车间 · 验证能力"','textarea')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_qcSave()">保存 Banner</button></div>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><h3>资质证书</h3><span class="card-count">共 ${certs.length} 项证书</span></div>
    <div class="card-body">
      ${certs.length ? `<div class="data-card-grid">${rows}</div>` : `<div class="empty-state"><p>暂无证书数据</p></div>`}
    </div>
  </div>`;
}
function _qcSave() {
  const q = DB.qual || (DB.qual = {});
  q.bannerTitle = document.getElementById('qc-banner-title').value.trim();
  q.bannerSub = document.getElementById('qc-banner-sub').value.trim();
  saveData(); toast('横幅已保存');
}

// ═══════════════════════════════════════════
// HTML ESCAPE HELPER
// ═══════════════════════════════════════════
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ═══════════════════════════════════════════
// HOMEPAGE EDITOR
// ═══════════════════════════════════════════
let _hpState = {tab:'hero'};

function renderHomepageEditor() {
  const hp = DB.homepage;
  const globals = hp.globals;
  const footer = hp.footer;

  // Tab buttons
  const tabs = [
    {key:'hero',label:'Hero轮播'},
    {key:'globals',label:'全局设置'},
    {key:'footer',label:'页脚'},
    {key:'stats',label:'数据统计'},
    {key:'coreBusiness',label:'核心业务'},
    {key:'partners',label:'合作伙伴'},
    {key:'cta',label:'询盘引导'},
    {key:'qualifications',label:'资质认证'},
    {key:'qualEnv',label:'生产环境'}
  ];
  const tabBtns = tabs.map(t =>
    `<button class="hp-tab ${_hpState.tab===t.key?'active':''}" onclick="_hpSwitchTab('${t.key}')">${t.label}</button>`
  ).join('');

  let body = '';
  if (_hpState.tab === 'hero') {
    const hero = hp.hero || {images:[],subTitle:'',title1:'',title2:'',desc1:'',desc2:'',leftBtnText:'',leftBtnLink:'',rightBtnText:'',rightBtnLink:'',bottomGuide:''};
    const imgs = hero.images || [];
    const imgItems = imgs.map((ref,i) => {
      const media = _mediaByRef(ref);
      const src = media ? media.dataUrl : ref;
      const label = media ? media.name : ref;
      return `
        <div class="hp-img-item" draggable="true" data-idx="${i}" ondragstart="_hpImgDragStart(event,${i})" ondragover="_hpImgDragOver(event)" ondrop="_hpImgDrop(event,${i})" ondragend="_hpImgDragEnd()">
          <span class="hp-img-order">${i+1}</span>
          <img class="hp-img-thumb" src="${escHtml(src)}" alt="${escHtml(label)}">
          <button class="hp-img-del" onclick="_hpRemoveImage(${i})" title="删除">×</button>
        </div>`;
    }).join('');

    body = `<div class="hp-hero-title">背景图片（拖动排序）</div>
    <div class="hp-img-list">
      ${imgItems}
      <button class="hp-img-add" onclick="_hpImgAddMenu()">+ 增加背景图片</button>
    </div>
    ${imgs.length ? '' : `<div class="hp-img-empty-tip">还没有背景图，点「增加背景图片」添加</div>`}
    <input type="file" accept="image/*" id="hp-img-file" style="display:none" onchange="_hpImgUpload(this)">
    <div class="hp-hero-divider"></div>
    <div class="hp-hero-title">文字框架（固定一套）</div>
    <div class="hp-form-grid">
      ${_hpField('hp-subTitle','英文副标题',hero.subTitle||'','Banner上方小字，如"精密制造"')}
      ${_hpField('hp-title1','主标题行1',hero.title1||'','如"精密制造"')}
      ${_hpField('hp-title2','主标题行2',hero.title2||'','如"守护生命健康"')}
      ${_hpField('hp-desc1','描述文字1',hero.desc1||'','第一段说明文字','textarea')}
      ${_hpField('hp-desc2','描述文字2',hero.desc2||'','第二段说明文字','textarea')}
      ${_hpFieldLink('hp-leftBtnText','左按钮文字',hero.leftBtnText||'','hp-leftBtnLink','左按钮链接',hero.leftBtnLink||'','选择按钮跳转的前端模块')}
      ${_hpFieldLink('hp-rightBtnText','右按钮文字',hero.rightBtnText||'','hp-rightBtnLink','右按钮链接',hero.rightBtnLink||'','选择按钮跳转的前端模块')}
      ${_hpField('hp-bottomGuide','底部引导文字',hero.bottomGuide||'','如"向下了解详情"')}
    </div>
    <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_hpSaveHero()">保存</button></div>`;
  } else if (_hpState.tab === 'globals') {
    body = `<div class="hp-form-grid">
      ${_hpFieldImg('hp-globLogo','网站 Logo',globals.logo||'','导航栏左上角Logo')}
      ${_hpField('hp-globBrand','品牌名称',globals.brandName||'','如 HONDVO')}
      ${_hpField('hp-globNavBtn','导航栏右侧按钮文字',globals.navBtnText||'','如"立即询价"')}
      ${_hpField('hp-globCookie','Cookie 弹窗文案',globals.cookieText||'','','textarea')}
    </div>
    <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_hpSaveGlobals()">保存</button></div>`;
  } else if (_hpState.tab === 'footer') {
    const linkRows = (footer.links||[]).map((l,i) => `
      <div class="hp-footer-link-row">
        <input class="form-input" style="flex:1" value="${escHtml(l.text||'')}" placeholder="链接文字，如 关于我们" oninput="_hpFooterLinkChange(${i},'text',this.value)">
        <select class="form-input" style="flex:1" onchange="_hpFooterLinkChange(${i},'url',this.value)">${_hpLinkOptions(l.url||'')}</select>
        <button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}" onclick="_hpFooterLinkDelete(${i})">删除</button>
      </div>
    `).join('');
    body = `<div class="hp-form-grid">
      ${_hpField('hp-footCopyright','版权信息',footer.copyright||'','如 © 2024 HONDVO Technology')}
      ${_hpField('hp-footIcp','备案号',footer.icp||'','如 粤ICP备XXXXXXXX号')}
      <div class="hp-form-row"><label class="hp-form-label">页脚链接</label>
        <div class="hp-form-value" id="hp-footer-links">${linkRows}
          <button class="btn btn-sm btn-secondary" onclick="_hpFooterLinkAdd()">+ 添加链接</button>
        </div>
      </div>
    </div>
    <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_hpSaveFooter()">保存</button></div>`;
  } else if (_hpState.tab === 'stats') {
    const statRows = (hp.stats||[]).map((s,i) => `
      <div class="hp-stat-row">
        <input class="form-input" value="${escHtml(s.label||'')}" placeholder="名称，如 台加工设备" oninput="_hpStatChange(${i},'label',this.value)">
        <input class="form-input hp-stat-value" value="${escHtml(s.value||'')}" placeholder="数值，如 109" oninput="_hpStatChange(${i},'value',this.value)">
        <button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}" onclick="_hpStatDelete(${i})">删除</button>
      </div>`).join('');
    body = `<div class="hp-form-grid">
      <div class="hp-form-row"><label class="hp-form-label">统计项</label>
        <div class="hp-form-value" id="hp-stats">
          ${statRows}
          <button class="btn btn-sm btn-secondary" onclick="_hpStatAdd()">+ 添加统计项</button>
        </div>
      </div>
    </div>
    <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_hpSaveStats()">保存</button></div>`;
  } else if (_hpState.tab === 'coreBusiness') {
    const items = (hp.coreBusiness||[]).map((b,i) => `
      <div class="hp-card-edit">
        <div class="hp-card-edit-head">
          <span class="hp-card-edit-title">业务 ${i+1}</span>
          <button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}" onclick="_hpCoreDelete(${i})">删除</button>
        </div>
        <div class="hp-form-grid">
          ${_hpFieldMedia('hp-core-img-'+i,'业务配图',b.image||'','建议尺寸 800×500px')}
          ${_hpField('hp-core-title-'+i,'标题',b.title||'','业务名称')}
          ${_hpField('hp-core-desc-'+i,'描述',b.desc||'','详细说明','textarea')}
          ${_hpFieldLink('hp-core-btn-'+i,'按钮文字',b.btnText||'了解详情','hp-core-link-'+i,'按钮链接',b.link||'','了解详情按钮跳转的前端模块')}
        </div>
      </div>`).join('');
    body = `<div class="hp-cards">${items}
      <button class="btn btn-secondary" onclick="_hpCoreAdd()">+ 添加核心业务</button>
    </div>
    <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_hpSaveCoreBusiness()">保存</button></div>`;
  } else if (_hpState.tab === 'partners') {
    const items = (hp.partners||[]).map((p,i) => `
      <div class="hp-card-edit">
        <div class="hp-card-edit-head">
          <span class="hp-card-edit-title">伙伴 ${i+1}</span>
          <button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}" onclick="_hpPartnerDelete(${i})">删除</button>
        </div>
        <div class="hp-form-grid">
          ${_hpFieldMedia('hp-part-img-'+i,'品牌 Logo 图片',p.image||'','建议透明底 PNG，尺寸 240×120px')}
          ${_hpField('hp-part-name-'+i,'品牌名称',p.name||'','如 Medtronic')}
        </div>
      </div>`).join('');
    body = `<div class="hp-cards">${items}
      <button class="btn btn-secondary" onclick="_hpPartnerAdd()">+ 添加合作伙伴</button>
    </div>
    <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_hpSavePartners()">保存</button></div>`;
  } else if (_hpState.tab === 'cta') {
    const cta = hp.cta || {title:'',btnText:''};
    body = `<div class="hp-form-grid">
      ${_hpField('hp-cta-title','标题文字',cta.title||'','如 有医疗器械部件需求？')}
      ${_hpField('hp-cta-btn','按钮文字',cta.btnText||'','如 立即咨询')}
    </div>
    <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_hpSaveCta()">保存</button></div>`;
  } else if (_hpState.tab === 'qualifications') {
    body = `<div class="hp-jump-card">
      <div class="hp-jump-title">资质认证</div>
      <div class="hp-jump-desc">证书、认证体系等完整内容请在「资质认证」编辑页中维护，编辑后将全站同步。</div>
      <button class="btn btn-primary btn-lg" onclick="navigateTo('edit-qualifications')">前往编辑</button>
    </div>`;
  } else if (_hpState.tab === 'qualEnv') {
    body = `<div class="hp-jump-card">
      <div class="hp-jump-title">生产环境</div>
      <div class="hp-jump-desc">生产环境、净化车间等完整内容请在「生产环境」编辑页中维护，编辑后将全站同步。</div>
      <button class="btn btn-primary btn-lg" onclick="navigateTo('edit-qual-env')">前往编辑</button>
    </div>`;
  }

  return `<div class="card hp-editor">
    <div class="card-header"><h3>首页内容编辑</h3></div>
    <div class="card-body">
      <div class="hp-tabs">${tabBtns}</div>
      ${body}
    </div>
  </div>`;
}

function _hpField(id,label,value,hint,type){
  if (type==='textarea') {
    return `<div class="hp-form-row"><label class="hp-form-label" for="${id}">${label}</label>
      <div class="hp-form-value"><textarea class="form-input" id="${id}" rows="3">${escHtml(value)}</textarea>
      ${hint?`<span class="hp-hint">${hint}</span>`:''}</div></div>`;
  }
  return `<div class="hp-form-row"><label class="hp-form-label" for="${id}">${label}</label>
    <div class="hp-form-value"><input class="form-input" id="${id}" value="${escHtml(value)}">
    ${hint?`<span class="hp-hint">${hint}</span>`:''}</div></div>`;
}

// ═══════════════════════════════════════════
// 前端页面模块链接（中文名 → 锚点）
// ═══════════════════════════════════════════
const _PAGE_LINKS = [
  {label:'首页', value:'#page-home'},
  {label:'关于我们', value:'#page-about'},
  {label:'产品与服务', value:'#page-products'},
  {label:'模具中心', value:'#page-mold'},
  {label:'资质实力', value:'#page-qualifications'},
  {label:'新闻动态', value:'#page-news'},
  {label:'联系我们', value:'#page-contact'}
];
// 生成链接下拉选项；当前值不在列表时附加一个原值项（兼容旧数据）
function _hpLinkOptions(sel){
  var opts = _PAGE_LINKS.map(function(l){
    return '<option value="' + l.value + '"' + (l.value===sel?' selected':'') + '>' + l.label + '</option>';
  }).join('');
  var known = _PAGE_LINKS.some(function(l){ return l.value === sel; });
  if (sel && !known) opts += '<option value="' + escHtml(sel) + '" selected>' + escHtml(sel) + '</option>';
  return opts;
}

function _hpFieldLink(id1,label1,value1,id2,label2,value2,hint){
  return `<div class="hp-form-row"><label class="hp-form-label">${label1}</label>
    <div class="hp-form-value hp-form-link-row">
      <input class="form-input" id="${id1}" value="${escHtml(value1)}" placeholder="${label1}" style="flex:1">
      <span style="color:var(--slate-400);margin:0 8px">链接</span>
      <select class="form-input" id="${id2}" style="flex:1">${_hpLinkOptions(value2)}</select>
      ${hint?`<span class="hp-hint">${hint}</span>`:''}
    </div></div>`;
}

function _hpFieldImg(id,label,value,hint){
  const preview = value
    ? `<img src="${escHtml(value)}" class="hp-img-preview" id="${id}-preview">`
    : `<div class="hp-img-preview hp-img-empty" id="${id}-preview">暂无图片</div>`;
  return `<div class="hp-form-row"><label class="hp-form-label">${label}</label>
    <div class="hp-form-value">
      <div class="hp-img-row">
        <input type="file" accept="image/*" id="${id}-file" style="display:none" onchange="_hpFileChange(this,'${id}')">
        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('${id}-file').click()">选择文件</button>
        ${preview}
        <input type="hidden" id="${id}" value="${escHtml(value)}">
      </div>
      ${hint?`<span class="hp-hint">${hint}</span>`:''}
    </div></div>`;
}

function _hpFileChange(input, targetId){
  const file = input.files[0];
  if (!file) return;
  if (file.size > 2*1024*1024) { toast('图片大小不能超过 2MB','error'); return; }
  const reader = new FileReader();
  reader.onload = function(e){
    document.getElementById(targetId).value = e.target.result;
    document.getElementById(targetId+'-preview').outerHTML = `<img src="${e.target.result}" class="hp-img-preview" id="${targetId}-preview">`;
  };
  reader.readAsDataURL(file);
}

// Tab switching
function _hpSwitchTab(tab){
  _hpState.tab = tab;
  document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
}

// Hero background image management
function _mediaByRef(ref){
  if (typeof ref !== 'string' || ref.indexOf('media:') !== 0) return null;
  const id = parseInt(ref.slice(6), 10);
  if (isNaN(id)) return null;
  return DB.media.find(function(m){ return m.id === id; }) || null;
}

function _hpHeroRerender(){
  document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
}

function _hpImgAddMenu(){
  const container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <div class="modal-header"><h3>增加背景图片</h3><button class="modal-close" onclick="closeModal()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
        <div class="modal-body">
          <div class="hp-add-menu">
            <button class="hp-add-option" onclick="closeModal();document.getElementById('hp-img-file').click()">
              <strong>本地上传</strong><span>从电脑选图，自动导入媒体库</span>
            </button>
            <button class="hp-add-option" onclick="closeModal();_hpOpenMediaPicker()">
              <strong>从媒体库选</strong><span>从已上传的图片里勾选</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function _hpImgUpload(input){
  const files = Array.prototype.slice.call(input.files || []);
  input.value = '';
  if (!files.length) return;
  let pending = files.length, ok = 0;
  files.forEach(function(file){
    if (file.size > 2*1024*1024 || !/^image\//.test(file.type)) {
      pending--;
      toast('跳过非图片或超 2MB 的文件', 'error');
      if (pending === 0) _hpHeroRerender();
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e){
      DB.media.push({
        id: DB.nextId.media++,
        name: file.name.replace(/\.[^.]+$/,''),
        cat: '其他',
        dataUrl: e.target.result,
        size: file.size,
        createdAt: Date.now()
      });
      const newRef = 'media:' + (DB.nextId.media - 1);
      if (DB.homepage.hero.images.indexOf(newRef) === -1) DB.homepage.hero.images.push(newRef);
      ok++; pending--;
      if (pending === 0) {
        try { saveData(); } catch(err) { toast('存储空间不足，请减少图片', 'error'); }
        _hpHeroRerender();
        toast('已添加 ' + ok + ' 张背景图并导入媒体库');
      }
    };
    reader.onerror = function(){ pending--; if (pending === 0) _hpHeroRerender(); };
    reader.readAsDataURL(file);
  });
}

function _hpRemoveImage(idx){
  _hpConfirmDialog(
    '删除背景图片',
    `确定要删除第 ${idx+1} 张背景图片吗？此操作不可恢复。`,
    function(){
      DB.homepage.hero.images.splice(idx,1);
      saveData();
      _hpHeroRerender();
      toast('已删除背景图片');
    }
  );
}

let _hpDragIdx = null;
function _hpImgDragStart(e, idx){
  _hpDragIdx = idx;
  try { e.dataTransfer.setData('text/plain', String(idx)); } catch(err){}
  e.dataTransfer.effectAllowed = 'move';
  const el = e.currentTarget;
  setTimeout(function(){ el.classList.add('dragging'); }, 0);
}
function _hpImgDragOver(e){
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function _hpImgDrop(e, idx){
  e.preventDefault();
  const from = _hpDragIdx;
  _hpDragIdx = null;
  if (from === null || from === idx) return;
  const images = DB.homepage.hero.images;
  const moved = images.splice(from, 1)[0];
  const target = from < idx ? idx - 1 : idx;
  images.splice(target, 0, moved);
  saveData();
  _hpHeroRerender();
}
function _hpImgDragEnd(){
  _hpDragIdx = null;
}

// Media picker
let _mediaPickerSelected = [];
let _hpMediaRefFieldId = null;
function _hpOpenMediaPicker(){
  _mediaPickerSelected = [];
  _hpMediaRefFieldId = null;
  _hpMediaPickerRender();
}
function _hpMediaPickerRender(){
  const items = DB.media;
  const grid = items.length
    ? `<div class="media-picker-grid">${items.map(function(m){
        const sel = _mediaPickerSelected.indexOf(m.id) !== -1;
        return `<div class="media-picker-item ${sel?'selected':''}" onclick="_hpMediaPickerToggle(${m.id})">
          <img src="${m.dataUrl}" alt="${escHtml(m.name)}">
          <div class="media-picker-name">${escHtml(m.name)}</div>
          <span class="media-picker-check">✓</span>
        </div>`;
      }).join('')}</div>`
    : `<div class="empty-state">媒体库还没有图片，请先用「本地上传」添加</div>`;
  const container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal modal-lg">
        <div class="modal-header"><h3>从媒体库选择背景图</h3><button class="modal-close" onclick="closeModal()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
        <div class="modal-body">${grid}</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">取消</button>
          <button class="btn btn-primary" onclick="_hpMediaPickerConfirm()">添加选中（${_mediaPickerSelected.length}）</button>
        </div>
      </div>
    </div>`;
}
function _hpMediaPickerToggle(id){
  const i = _mediaPickerSelected.indexOf(id);
  if (i !== -1) _mediaPickerSelected.splice(i,1);
  else _mediaPickerSelected.push(id);
  _hpMediaPickerRender();
}
function _hpMediaPickerConfirm(){
  const count = _mediaPickerSelected.length;
  if (!count) { closeModal(); return; }
  if (_hpMediaRefFieldId) {
    const el = document.getElementById(_hpMediaRefFieldId);
    if (el) {
      el.value = 'media:' + _mediaPickerSelected[0];
      _hpMediaRefPreview(_hpMediaRefFieldId);
    }
    _hpMediaRefFieldId = null;
    closeModal();
    toast('已选择图片');
    return;
  }
  _mediaPickerSelected.forEach(function(id){
    const ref = 'media:' + id;
    if (DB.homepage.hero.images.indexOf(ref) === -1) DB.homepage.hero.images.push(ref);
  });
  closeModal();
  saveData();
  _hpHeroRerender();
  toast('已添加 ' + count + ' 张背景图');
}

// Save functions
function _hpSaveHero(){
  const hero = DB.homepage.hero;
  hero.subTitle = document.getElementById('hp-subTitle').value.trim();
  hero.title1 = document.getElementById('hp-title1').value.trim();
  hero.title2 = document.getElementById('hp-title2').value.trim();
  hero.desc1 = document.getElementById('hp-desc1').value.trim();
  hero.desc2 = document.getElementById('hp-desc2').value.trim();
  hero.leftBtnText = document.getElementById('hp-leftBtnText').value.trim();
  hero.leftBtnLink = document.getElementById('hp-leftBtnLink').value.trim();
  hero.rightBtnText = document.getElementById('hp-rightBtnText').value.trim();
  hero.rightBtnLink = document.getElementById('hp-rightBtnLink').value.trim();
  hero.bottomGuide = document.getElementById('hp-bottomGuide').value.trim();
  saveData();
  toast('已保存');
}
function _hpSaveGlobals(){
  const g = DB.homepage.globals;
  g.logo = document.getElementById('hp-globLogo').value;
  g.brandName = document.getElementById('hp-globBrand').value.trim();
  g.navBtnText = document.getElementById('hp-globNavBtn').value.trim();
  g.cookieText = document.getElementById('hp-globCookie').value.trim();
  saveData();
  toast('已保存');
}
function _hpSaveFooter(){
  const f = DB.homepage.footer;
  f.copyright = document.getElementById('hp-footCopyright').value.trim();
  f.icp = document.getElementById('hp-footIcp').value.trim();
  saveData();
  toast('已保存');
}

// Footer link helpers
function _hpFooterLinkChange(idx, field, value){
  DB.homepage.footer.links[idx][field] = value;
}
function _hpFooterLinkAdd(){
  DB.homepage.footer.links.push({text:'',url:''});
  saveData();
  document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
}
function _hpFooterLinkDelete(idx){
  const item = DB.homepage.footer.links[idx];
  if (!item) return;
  _hpConfirmDialog(
    '删除页脚链接',
    `确定要删除链接「${escHtml(item.text || '未命名')}」吗？此操作不可恢复。`,
    function(){
      DB.homepage.footer.links.splice(idx,1);
      saveData();
      document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
      toast('已删除链接');
    }
  );
}

// Single media:N field (for coreBusiness image etc.) — 也兼容任意 URL/路径
function _hpFieldMedia(id,label,value,hint){
  const media = _mediaByRef(value);
  const src = media ? media.dataUrl : (value || '');
  const preview = src
    ? `<img src="${escHtml(src)}" class="hp-img-preview" id="${id}-preview">`
    : `<div class="hp-img-preview hp-img-empty" id="${id}-preview">暂无图片</div>`;
  const refName = media ? media.name : '';
  return `<div class="hp-form-row"><label class="hp-form-label">${label}</label>
    <div class="hp-form-value">
      <div class="hp-img-row">
        <input type="file" accept="image/*" id="${id}-file" style="display:none" onchange="_hpMediaUpload(this,'${id}')">
        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('${id}-file').click()">本地上传</button>
        <button class="btn btn-sm btn-secondary" onclick="_hpPickMediaRef('${id}')">从媒体库选</button>
        ${value?`<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}" onclick="_hpClearMediaRef('${id}')">清除</button>`:''}
        ${preview}
        <input type="hidden" id="${id}" value="${escHtml(value)}">
      </div>
      ${refName?`<span class="hp-hint">当前引用：${escHtml(refName)}</span>`:''}
      ${hint?`<span class="hp-hint">${hint}</span>`:''}
    </div></div>`;
}

// 全局图片选择器（旧函数名，统一走 _hpFieldMedia 双入口）
function _hpFieldImg(id,label,value,hint){
  return _hpFieldMedia(id,label,value,hint);
}

function _hpPickMediaRef(targetId){
  _hpMediaRefFieldId = targetId;
  _mediaPickerSelected = [];
  _hpMediaPickerRender();
}

function _hpMediaRefPreview(targetId){
  const el = document.getElementById(targetId);
  const ref = el ? el.value : '';
  const media = _mediaByRef(ref);
  const src = media ? media.dataUrl : '';
  const prev = document.getElementById(targetId+'-preview');
  if (prev) {
    if (src) prev.outerHTML = `<img src="${src}" class="hp-img-preview" id="${targetId}-preview">`;
    else prev.outerHTML = `<div class="hp-img-preview hp-img-empty" id="${targetId}-preview">暂无图片</div>`;
  }
}

function _hpMediaUpload(input, targetId){
  const file = input.files[0];
  input.value = '';
  if (!file) return;
  if (file.size > 2*1024*1024 || !/^image\//.test(file.type)) { toast('图片需为图片且不超过 2MB','error'); return; }
  const reader = new FileReader();
  reader.onload = function(e){
    DB.media.push({
      id: DB.nextId.media++,
      name: file.name.replace(/\.[^.]+$/,''),
      cat: '其他',
      dataUrl: e.target.result,
      size: file.size,
      createdAt: Date.now()
    });
    const newRef = 'media:' + (DB.nextId.media - 1);
    const el = document.getElementById(targetId);
    if (el) el.value = newRef;
    try { saveData(); } catch(err) { toast('存储空间不足，请减少图片','error'); }
    _hpMediaRefPreview(targetId);
    toast('已上传并导入媒体库');
  };
  reader.onerror = function(){ toast('图片读取失败','error'); };
  reader.readAsDataURL(file);
}

function _hpClearMediaRef(targetId){
  const el = document.getElementById(targetId);
  if (el) el.value = '';
  _hpMediaRefPreview(targetId);
}

// Stats
function _hpStatChange(idx, field, value){
  if (!DB.homepage.stats[idx]) return;
  DB.homepage.stats[idx][field] = value;
}
function _hpStatAdd(){
  DB.homepage.stats.push({label:'',value:''});
  saveData();
  document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
}
function _hpStatDelete(idx){
  const item = DB.homepage.stats[idx];
  if (!item) return;
  _hpConfirmDialog(
    '删除统计项',
    `确定要删除统计项「${escHtml(item.label || '未命名')}」吗？此操作不可恢复。`,
    function(){
      DB.homepage.stats.splice(idx,1);
      saveData();
      document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
      toast('已删除统计项');
    }
  );
}
function _hpSaveStats(){
  const rows = document.querySelectorAll('#hp-stats .hp-stat-row');
  Array.prototype.forEach.call(rows, function(row, i){
    const inputs = row.querySelectorAll('input');
    if (DB.homepage.stats[i] && inputs.length >= 2) {
      DB.homepage.stats[i].label = inputs[0].value.trim();
      DB.homepage.stats[i].value = inputs[1].value.trim();
    }
  });
  saveData();
  toast('已保存');
}

// Core business
function _hpCoreAdd(){
  DB.homepage.coreBusiness.push({image:'',title:'',desc:'',btnText:'了解详情',link:'#page-products'});
  saveData();
  document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
}
function _hpCoreDelete(idx){
  const item = DB.homepage.coreBusiness[idx];
  if (!item) return;
  _hpConfirmDialog(
    '删除核心业务',
    `确定要删除「业务 ${idx+1}：${escHtml(item.title || '未命名')}」吗？此操作不可恢复。`,
    function(){
      DB.homepage.coreBusiness.splice(idx,1);
      saveData();
      document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
      toast('已删除业务');
    }
  );
}
function _hpSaveCoreBusiness(){
  const list = DB.homepage.coreBusiness;
  list.forEach(function(b, i){
    const titleEl = document.getElementById('hp-core-title-'+i);
    const descEl = document.getElementById('hp-core-desc-'+i);
    const imgEl = document.getElementById('hp-core-img-'+i);
    const btnEl = document.getElementById('hp-core-btn-'+i);
    const linkEl = document.getElementById('hp-core-link-'+i);
    if (titleEl) b.title = titleEl.value.trim();
    if (descEl) b.desc = descEl.value.trim();
    if (imgEl) b.image = imgEl.value;
    if (btnEl) b.btnText = btnEl.value.trim() || '了解详情';
    if (linkEl) b.link = linkEl.value;
  });
  saveData();
  toast('已保存');
}

// Partners
function _hpPartnerChange(idx, field, value){
  if (!DB.homepage.partners[idx]) return;
  DB.homepage.partners[idx][field] = value;
}
function _hpPartnerAdd(){
  DB.homepage.partners.push({name:'',image:''});
  saveData();
  document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
}
function _hpPartnerDelete(idx){
  const item = DB.homepage.partners[idx];
  if (!item) return;
  _hpConfirmDialog(
    '删除合作伙伴',
    `确定要删除合作伙伴「${escHtml(item.name || '未命名')}」吗？此操作不可恢复。`,
    function(){
      DB.homepage.partners.splice(idx,1);
      saveData();
      document.getElementById('main-content-inner').innerHTML = renderHomepageEditor();
      toast('已删除合作伙伴');
    }
  );
}
function _hpSavePartners(){
  const list = DB.homepage.partners;
  list.forEach(function(p, i){
    const nameEl = document.getElementById('hp-part-name-'+i);
    const imgEl = document.getElementById('hp-part-img-'+i);
    if (nameEl) p.name = nameEl.value.trim();
    if (imgEl) p.image = imgEl.value;
    // 清理旧版字段（图标缩写/背景色 → 品牌 Logo 图片）
    if (p.icon !== undefined) delete p.icon;
    if (p.color !== undefined) delete p.color;
  });
  saveData();
  toast('已保存');
}

// CTA
function _hpSaveCta(){
  const c = DB.homepage.cta;
  c.title = document.getElementById('hp-cta-title').value.trim();
  c.btnText = document.getElementById('hp-cta-btn').value.trim();
  saveData();
  toast('已保存');
}

// ═══════════════════════════════════════════
// COLLAPSIBLE NAV GROUP
// ═══════════════════════════════════════════
function toggleNavGroup(parent) {
  const group = parent.parentElement;
  const isExpanded = group.classList.contains('expanded');
  // Accordion: close all sibling groups first
  const siblingGroups = group.parentElement.querySelectorAll(':scope > .nav-group.expanded');
  siblingGroups.forEach(g => g.classList.remove('expanded'));
  // If this group wasn't expanded, expand it now
  if (!isExpanded) group.classList.add('expanded');
}

// ═══════════════════════════════════════════
// PAGE EVENT BINDING
// ═══════════════════════════════════════════
function attachPageEvents(page) {
  if (page === 'dashboard') {
    setTimeout(function(){
      initInquiryChart(30);
      _loadDashboardAnalytics();
      _loadInquiries(); // 顺带拉询盘，刷新「最近询盘」
    }, 200);
  }
  if (page === 'inquiries') {
    setTimeout(function(){ _loadInquiries(true); }, 100);
  }
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
// DB is already loaded above


// ═══════════════════════════════════════════
// ABOUT — WHO (我们是谁)
// ═══════════════════════════════════════════
let _awSpecIdx = 0;
let _awStatIdx = 0;
function renderAboutWho() {
  const d = DB.about.who;
  if (!d.specializations || d.specializations.length === 0) d.specializations = [{title:'',desc:''}];
  if (!d.stats || d.stats.length === 0) d.stats = [{value:'',label:''}];
  _awSpecIdx = Math.min(_awSpecIdx, d.specializations.length - 1);
  _awStatIdx = Math.min(_awStatIdx, d.stats.length - 1);
  const specs = d.specializations;
  const stats = d.stats;
  const spec = specs[_awSpecIdx] || {};
  const stat = stats[_awStatIdx] || {};
  const specTabs = specs.map((s,i) =>
    `<button class="hp-slide-tag ${i===_awSpecIdx?'active':''}" onclick="_awSpecSelect(${i})">方向${i+1}</button>`
  ).join('');
  const specDelete = specs.length > 1
    ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_awSpecDelete(${_awSpecIdx})">删除</button>` : '';
  const statTabs = stats.map((s,i) =>
    `<button class="hp-slide-tag ${i===_awStatIdx?'active':''}" onclick="_awStatSelect(${i})">统计${i+1}</button>`
  ).join('');
  const statDelete = stats.length > 1
    ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_awStatDelete(${_awStatIdx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>关于我们 — 我们是谁</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('aw-title','区块标题',d.title||'','页面主标题，如 HONDVO')}
        ${_hpField('aw-subtitle','副标题',d.subtitle||'','主标题下方小字')}
        ${_hpField('aw-desc','描述内容',d.description||'','详细介绍文字','textarea')}
        ${_hpFieldImg('aw-image','配图',d.image||'','建议尺寸 800×500px')}
      </div>
      <div class="hp-sub-section">科技公司</div>
      <div class="hp-form-grid">
        ${_hpField('aw-tech-title','科技公司标题',d.techTitle||'','如 HONDVO Technology (Dongguan) Co., Ltd.')}
        ${_hpField('aw-tech-desc','科技公司介绍',d.techDesc||'','公司能力与设备说明','textarea')}
        ${_hpField('aw-tech-focus','聚焦说明',d.techFocus||'','如"当前重点深耕医疗器械领域，主要产品包括："')}
      </div>
      <div class="hp-sub-section">细分方向</div>
      <div class="hp-slide-bar">${specTabs}${specDelete}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_awSpecAdd()">+ 新增</button></div>
      <div class="hp-form-grid">
        ${_hpField('aw-spec-title','方向标题',spec.title||'','如"体外诊断耗材"')}
        ${_hpField('aw-spec-desc','方向说明',spec.desc||'','具体产品说明','textarea')}
      </div>
      <div class="hp-form-grid">
        ${_hpField('aw-tech-cert','认证说明',d.techCert||'','净化车间与认证体系','textarea')}
        ${_hpField('aw-tech-more','更多说明',d.techMore||'','工业级订单承接说明','textarea')}
      </div>
      <div class="hp-sub-section">模具公司</div>
      <div class="hp-form-grid">
        ${_hpField('aw-mold-title','模具公司标题',d.moldTitle||'','如 HONDVO TOOLING LIMITED')}
        ${_hpField('aw-mold-desc','模具公司介绍',d.moldDesc||'','模具制造能力说明','textarea')}
      </div>
      <div class="hp-sub-section">统计数字</div>
      <div class="hp-slide-bar">${statTabs}${statDelete}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_awStatAdd()">+ 新增</button></div>
      <div class="hp-form-grid">
        ${_hpField('aw-stat-value','数值',stat.value||'','如 109')}
        ${_hpField('aw-stat-label','标签',stat.label||'','如 加工设备')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_awSave()">保存</button></div>
    </div>
  </div>`;
}
function _awSpecSelect(idx) { _awSpecIdx = idx; document.getElementById('main-content-inner').innerHTML = renderAboutWho(); }
function _awSpecAdd() {
  DB.about.who.specializations.push({title:'',desc:''});
  _awSpecIdx = DB.about.who.specializations.length - 1;
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutWho();
}
function _awSpecDelete(idx) {
  if (DB.about.who.specializations.length <= 1) return;
  DB.about.who.specializations.splice(idx,1);
  _awSpecIdx = Math.min(_awSpecIdx, DB.about.who.specializations.length - 1);
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutWho();
  toast('已删除');
}
function _awStatSelect(idx) { _awStatIdx = idx; document.getElementById('main-content-inner').innerHTML = renderAboutWho(); }
function _awStatAdd() {
  DB.about.who.stats.push({value:'',label:''});
  _awStatIdx = DB.about.who.stats.length - 1;
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutWho();
}
function _awStatDelete(idx) {
  if (DB.about.who.stats.length <= 1) return;
  DB.about.who.stats.splice(idx,1);
  _awStatIdx = Math.min(_awStatIdx, DB.about.who.stats.length - 1);
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutWho();
  toast('已删除');
}
function _awSave() {
  const d = DB.about.who;
  d.title = document.getElementById('aw-title').value.trim();
  d.subtitle = document.getElementById('aw-subtitle').value.trim();
  d.description = document.getElementById('aw-desc').value.trim();
  d.image = document.getElementById('aw-image').value;
  d.techTitle = document.getElementById('aw-tech-title').value.trim();
  d.techDesc = document.getElementById('aw-tech-desc').value.trim();
  d.techFocus = document.getElementById('aw-tech-focus').value.trim();
  d.techCert = document.getElementById('aw-tech-cert').value.trim();
  d.techMore = document.getElementById('aw-tech-more').value.trim();
  d.moldTitle = document.getElementById('aw-mold-title').value.trim();
  d.moldDesc = document.getElementById('aw-mold-desc').value.trim();
  const spec = d.specializations[_awSpecIdx];
  if (spec) {
    spec.title = document.getElementById('aw-spec-title').value.trim();
    spec.desc = document.getElementById('aw-spec-desc').value.trim();
  }
  const stat = d.stats[_awStatIdx];
  if (stat) {
    stat.value = document.getElementById('aw-stat-value').value.trim();
    stat.label = document.getElementById('aw-stat-label').value.trim();
  }
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// ABOUT — VALUES (核心价值) — 卡片列表模式
// ═══════════════════════════════════════════
let _avState = {idx:0};
function renderAboutValues() {
  const d = DB.about.values;
  if (!d.items || d.items.length === 0) d.items = [{icon:'',title:'',desc:''}];
  const items = d.items;
  const cur = items[_avState.idx] || {};
  const slideTabs = items.map((s,i) =>
    `<button class="hp-slide-tag ${i===_avState.idx?'active':''}" onclick="_avSelect(${i})">价值${i+1}</button>`
  ).join('');
  const deleteBtn = items.length > 1
    ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_avDelete(${_avState.idx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>关于我们 — 核心价值</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('av-title','模块标题',d.title||'','如"我们的核心价值观"')}
      </div>
      <div class="hp-slide-bar">${slideTabs}${deleteBtn}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_avAdd()">+ 新增</button></div>
      <div class="hp-form-grid">
        ${_hpField('av-icon','图标字符',cur.icon||'','输入 emoji 或图标文字，如 🎯 ⭐ 💡')}
        ${_hpField('av-item-title','标题',cur.title||'','如"质量至上"')}
        ${_hpField('av-item-desc','描述',cur.desc||'','详细说明','textarea')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_avSave()">保存</button></div>
    </div>
  </div>`;
}
function _avSelect(idx) { _avState.idx = idx; document.getElementById('main-content-inner').innerHTML = renderAboutValues(); }
function _avAdd() {
  DB.about.values.items.push({icon:'',title:'',desc:''});
  _avState.idx = DB.about.values.items.length - 1;
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutValues();
}
function _avDelete(idx) {
  if (DB.about.values.items.length <= 1) return;
  DB.about.values.items.splice(idx,1);
  _avState.idx = Math.min(_avState.idx, DB.about.values.items.length - 1);
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutValues();
  toast('已删除');
}
function _avSave() {
  const d = DB.about.values;
  d.title = document.getElementById('av-title').value.trim();
  const cur = d.items[_avState.idx];
  cur.icon = document.getElementById('av-icon').value.trim();
  cur.title = document.getElementById('av-item-title').value.trim();
  cur.desc = document.getElementById('av-item-desc').value.trim();
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// ABOUT — SPIRIT (弘欧精神) — 卡片列表模式
// ═══════════════════════════════════════════
let _asState = {idx:0};
function renderAboutSpirit() {
  const d = DB.about.spirit;
  if (!d.items || d.items.length === 0) d.items = [{icon:'',title:'',desc:''}];
  const items = d.items;
  const cur = items[_asState.idx] || {};
  const slideTabs = items.map((s,i) =>
    `<button class="hp-slide-tag ${i===_asState.idx?'active':''}" onclick="_asSelect(${i})">精神${i+1}</button>`
  ).join('');
  const deleteBtn = items.length > 1
    ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_asDelete(${_asState.idx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>关于我们 — 弘欧精神</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('as-title','模块标题',d.title||'','如"弘欧精神"')}
      </div>
      <div class="hp-slide-bar">${slideTabs}${deleteBtn}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_asAdd()">+ 新增</button></div>
      <div class="hp-form-grid">
        ${_hpField('as-icon','图标字符',cur.icon||'','输入图标类名，如 icon-diamond、icon-lightbulb')}
        ${_hpField('as-item-title','标题',cur.title||'','如"极致精密"')}
        ${_hpField('as-item-desc','描述',cur.desc||'','详细说明','textarea')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_asSave()">保存</button></div>
    </div>
  </div>`;
}
function _asSelect(idx) { _asState.idx = idx; document.getElementById('main-content-inner').innerHTML = renderAboutSpirit(); }
function _asAdd() {
  DB.about.spirit.items.push({icon:'',title:'',desc:''});
  _asState.idx = DB.about.spirit.items.length - 1;
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutSpirit();
}
function _asDelete(idx) {
  if (DB.about.spirit.items.length <= 1) return;
  DB.about.spirit.items.splice(idx,1);
  _asState.idx = Math.min(_asState.idx, DB.about.spirit.items.length - 1);
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutSpirit();
  toast('已删除');
}
function _asSave() {
  const d = DB.about.spirit;
  d.title = document.getElementById('as-title').value.trim();
  const cur = d.items[_asState.idx];
  cur.icon = document.getElementById('as-icon').value.trim();
  cur.title = document.getElementById('as-item-title').value.trim();
  cur.desc = document.getElementById('as-item-desc').value.trim();
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// ABOUT — PARTNERS (全球合作伙伴) — 卡片列表模式
// ═══════════════════════════════════════════
let _apState = {idx:0};
function renderAboutPartners() {
  const d = DB.about.partners;
  if (!d.items || d.items.length === 0) d.items = [{logo:'',name:'',link:''}];
  const items = d.items;
  const cur = items[_apState.idx] || {};
  const slideTabs = items.map((s,i) =>
    `<button class="hp-slide-tag ${i===_apState.idx?'active':''}" onclick="_apSelect(${i})">合作伙伴${i+1}</button>`
  ).join('');
  const deleteBtn = items.length > 1
    ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_apDelete(${_apState.idx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>关于我们 — 全球合作伙伴</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('ap-title','模块标题',d.title||'','如"全球合作伙伴"')}
      </div>
      <div class="hp-slide-bar">${slideTabs}${deleteBtn}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_apAdd()">+ 新增</button></div>
      <div class="hp-form-grid">
        ${_hpFieldImg('ap-logo','Logo',cur.logo||'','建议正方形 200×200px')}
        ${_hpField('ap-name','名称',cur.name||'','合作伙伴公司名称')}
        ${_hpField('ap-link','链接',cur.link||'','官网或详情链接')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_apSave()">保存</button></div>
    </div>
  </div>`;
}
function _apSelect(idx) { _apState.idx = idx; document.getElementById('main-content-inner').innerHTML = renderAboutPartners(); }
function _apAdd() {
  DB.about.partners.items.push({logo:'',name:'',link:''});
  _apState.idx = DB.about.partners.items.length - 1;
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutPartners();
}
function _apDelete(idx) {
  if (DB.about.partners.items.length <= 1) return;
  DB.about.partners.items.splice(idx,1);
  _apState.idx = Math.min(_apState.idx, DB.about.partners.items.length - 1);
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutPartners();
  toast('已删除');
}
function _apSave() {
  const d = DB.about.partners;
  d.title = document.getElementById('ap-title').value.trim();
  const cur = d.items[_apState.idx];
  cur.logo = document.getElementById('ap-logo').value;
  cur.name = document.getElementById('ap-name').value.trim();
  cur.link = document.getElementById('ap-link').value.trim();
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// ABOUT — CASES (客户案例) — 卡片列表模式
// ═══════════════════════════════════════════
let _acState = {idx:0};
function renderAboutCases() {
  const d = DB.about.cases;
  if (!d.items || d.items.length === 0) d.items = [{image:'',industry:'',title:'',challenge:'',solution:'',result:''}];
  const items = d.items;
  const cur = items[_acState.idx] || {};
  const slideTabs = items.map((s,i) =>
    `<button class="hp-slide-tag ${i===_acState.idx?'active':''}" onclick="_acSelect(${i})">案例${i+1}</button>`
  ).join('');
  const deleteBtn = items.length > 1
    ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_acDelete(${_acState.idx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>关于我们 — 客户案例</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('ac-title','模块标题',d.title||'','如"客户案例"')}
      </div>
      <div class="hp-slide-bar">${slideTabs}${deleteBtn}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_acAdd()">+ 新增</button></div>
      <div class="hp-form-grid">
        ${_hpFieldMedia('ac-image','案例图片',cur.image||'','建议尺寸 800×500px')}
        ${_hpField('ac-industry','行业标签',cur.industry||'','如 IVD 体外诊断 / 药物输送 / 手术器械')}
        ${_hpField('ac-item-title','案例标题',cur.title||'','项目名称')}
        ${_hpField('ac-challenge','挑战 Challenge',cur.challenge||'','项目背景与客户需求','textarea')}
        ${_hpField('ac-solution','方案 Solution',cur.solution||'','工艺与交付方案','textarea')}
        ${_hpField('ac-result','成果 Result',cur.result||'','关键指标与成果','textarea')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_acSave()">保存</button></div>
    </div>
  </div>`;
}
function _acSelect(idx) { _acState.idx = idx; document.getElementById('main-content-inner').innerHTML = renderAboutCases(); }
function _acAdd() {
  DB.about.cases.items.push({image:'',industry:'',title:'',challenge:'',solution:'',result:''});
  _acState.idx = DB.about.cases.items.length - 1;
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutCases();
}
function _acDelete(idx) {
  if (DB.about.cases.items.length <= 1) return;
  DB.about.cases.items.splice(idx,1);
  _acState.idx = Math.min(_acState.idx, DB.about.cases.items.length - 1);
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutCases();
  toast('已删除');
}
function _acSave() {
  const d = DB.about.cases;
  d.title = document.getElementById('ac-title').value.trim();
  const cur = d.items[_acState.idx];
  cur.image = document.getElementById('ac-image').value;
  cur.industry = document.getElementById('ac-industry').value.trim();
  cur.title = document.getElementById('ac-item-title').value.trim();
  cur.challenge = document.getElementById('ac-challenge').value.trim();
  cur.solution = document.getElementById('ac-solution').value.trim();
  cur.result = document.getElementById('ac-result').value.trim();
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// ABOUT — TEAM (团队) — 卡片列表模式
// ═══════════════════════════════════════════
let _atState = {idx:0};
function renderAboutTeam() {
  const d = DB.about.team;
  if (!d.items || d.items.length === 0) d.items = [{avatar:'',name:'',title:'',bio:''}];
  const items = d.items;
  const cur = items[_atState.idx] || {};
  const slideTabs = items.map((s,i) =>
    `<button class="hp-slide-tag ${i===_atState.idx?'active':''}" onclick="_atSelect(${i})">成员${i+1}</button>`
  ).join('');
  const deleteBtn = items.length > 1
    ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_atDelete(${_atState.idx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>关于我们 — 团队</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('at-title','模块标题',d.title||'','如"核心团队"')}
      </div>
      <div class="hp-slide-bar">${slideTabs}${deleteBtn}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_atAdd()">+ 新增</button></div>
      <div class="hp-form-grid">
        ${_hpFieldImg('at-avatar','头像',cur.avatar||'','建议正方形 300×300px')}
        ${_hpField('at-name','姓名',cur.name||'','成员姓名')}
        ${_hpField('at-role','职位',cur.title||'','如"总经理 / CEO"')}
        ${_hpField('at-bio','简介',cur.bio||'','个人简介或履历','textarea')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_atSave()">保存</button></div>
    </div>
  </div>`;
}
function _atSelect(idx) { _atState.idx = idx; document.getElementById('main-content-inner').innerHTML = renderAboutTeam(); }
function _atAdd() {
  DB.about.team.items.push({avatar:'',name:'',title:'',bio:''});
  _atState.idx = DB.about.team.items.length - 1;
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutTeam();
}
function _atDelete(idx) {
  if (DB.about.team.items.length <= 1) return;
  DB.about.team.items.splice(idx,1);
  _atState.idx = Math.min(_atState.idx, DB.about.team.items.length - 1);
  saveData(); document.getElementById('main-content-inner').innerHTML = renderAboutTeam();
  toast('已删除');
}
function _atSave() {
  const d = DB.about.team;
  d.title = document.getElementById('at-title').value.trim();
  const cur = d.items[_atState.idx];
  cur.avatar = document.getElementById('at-avatar').value;
  cur.name = document.getElementById('at-name').value.trim();
  cur.title = document.getElementById('at-role').value.trim();
  cur.bio = document.getElementById('at-bio').value.trim();
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// QUAL — ENV (生产环境)
// ═══════════════════════════════════════════
function renderQualEnv() {
  const d = DB.qual.env;
  return `<div class="card hp-editor">
    <div class="card-header"><h3>资质实力 — 生产环境</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('qe-title','标题',d.title||'','如"十万级净化车间"')}
        ${_hpField('qe-sub','副标题',d.sub||'','如"十万级洁净车间，满足医疗器械生产要求"')}
        ${_hpField('qe-images','图片(逗号分隔地址)',(d.images||[]).join(','),'多张图片地址用英文逗号分隔，也可使用下方图片上传逐张添加')}
        ${_hpField('qe-desc','描述内容',d.description||'','生产环境详细介绍','textarea')}
        ${_hpField('qe-highlights','亮点(每行一个)',(d.highlights||[]).join('\\n'),'每行填写一个亮点，如"ISO Class 8 十万级洁净度"','textarea')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_qeSave()">保存</button></div>
    </div>
  </div>`;
}
function _qeSave() {
  const d = DB.qual.env;
  d.title = document.getElementById('qe-title').value.trim();
  d.sub = document.getElementById('qe-sub').value.trim();
  d.images = document.getElementById('qe-images').value.split(',').map(s=>s.trim()).filter(Boolean);
  d.description = document.getElementById('qe-desc').value.trim();
  d.highlights = document.getElementById('qe-highlights').value.split('\\n').map(s=>s.trim()).filter(Boolean);
  if (d.highlights.length === 0) d.highlights = [''];
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// QUAL — IQ/OQ/PQ (验证体系)
// ═══════════════════════════════════════════
function renderQualIQOQPQ() {
  const d = DB.qual.iqoqpq;
  return `<div class="card hp-editor">
    <div class="card-header"><h3>资质实力 — IQ/OQ/PQ 验证体系</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('qp-title','标题',d.title||'','如"验证体系"')}
        <div class="hp-form-row"><label class="hp-form-label">${escHtml(d.iq.title||'IQ')}</label><div class="hp-form-value"><textarea class="form-input" id="qp-iq" rows="3">${escHtml(d.iq.desc||'')}</textarea><span class="hp-hint">安装确认 (Installation Qualification)</span></div></div>
        <div class="hp-form-row"><label class="hp-form-label">${escHtml(d.oq.title||'OQ')}</label><div class="hp-form-value"><textarea class="form-input" id="qp-oq" rows="3">${escHtml(d.oq.desc||'')}</textarea><span class="hp-hint">运行确认 (Operational Qualification)</span></div></div>
        <div class="hp-form-row"><label class="hp-form-label">${escHtml(d.pq.title||'PQ')}</label><div class="hp-form-value"><textarea class="form-input" id="qp-pq" rows="3">${escHtml(d.pq.desc||'')}</textarea><span class="hp-hint">性能确认 (Performance Qualification)</span></div></div>
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_qpSave()">保存</button></div>
    </div>
  </div>`;
}
function _qpSave() {
  const d = DB.qual.iqoqpq;
  d.title = document.getElementById('qp-title').value.trim();
  d.iq.desc = document.getElementById('qp-iq').value.trim();
  d.oq.desc = document.getElementById('qp-oq').value.trim();
  d.pq.desc = document.getElementById('qp-pq').value.trim();
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// CONTACT (联系我们)
// ═══════════════════════════════════════════
let _ctState = {pcIdx:0, foIdx:0};
function renderContact() {
  const d = DB.contact;
  if (!Array.isArray(d.purchaseCards) || d.purchaseCards.length === 0) d.purchaseCards = [{title:'',btnText:''}];
  if (!Array.isArray(d.formOptions) || d.formOptions.length === 0) d.formOptions = [''];
  if (!d.formLabels) d.formLabels = {};
  if (!d.formPlaceholders) d.formPlaceholders = {};
  const pc = d.purchaseCards;
  const curPc = pc[_ctState.pcIdx] || {};
  const fo = d.formOptions;
  const curFo = fo[_ctState.foIdx] || '';
  const pcTabs = pc.map((s,i)=>`<button class="hp-slide-tag ${i===_ctState.pcIdx?'active':''}" onclick="_ctPcSelect(${i})">购买卡${i+1}</button>`).join('');
  const pcDel = pc.length > 1 ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_ctPcDelete(${_ctState.pcIdx})">删除</button>` : '';
  const foTabs = fo.map((s,i)=>`<button class="hp-slide-tag ${i===_ctState.foIdx?'active':''}" onclick="_ctFoSelect(${i})">选项${i+1}</button>`).join('');
  const foDel = fo.length > 1 ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_ctFoDelete(${_ctState.foIdx})">删除</button>` : '';
  return `<div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>联系我们 — 页面 Banner</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('ct-banner-title','Banner 标题',d.bannerTitle||'','页面顶部大标题，如"联系我们"')}
        ${_hpField('ct-banner-sub','Banner 副标题',d.bannerSub||'','Banner 下方简介文字，如"双公司地址 · 欢迎莅临交流"','textarea')}
      </div>
    </div>
  </div>
  <div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>购买入口卡片</h3></div>
    <div class="card-body">
      <div class="hp-slide-bar">${pcTabs}${pcDel}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_ctPcAdd()">+ 新增购买卡</button></div>
      <div class="hp-form-grid">
        ${_hpField('ct-pc-title','卡片标题',curPc.title||'','如"模具销售"')}
        ${_hpField('ct-pc-btn','按钮文字',curPc.btnText||'','如"获取报价"')}
      </div>
    </div>
  </div>
  <div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>联系方式与地址</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('ct-other-title','其他咨询小标题',d.otherTitle||'','如"其他咨询"')}
        ${_hpField('ct-mold-name','模具公司名称',d.moldName||'','')}
        ${_hpField('ct-mold-addr','模具公司地址',d.moldAddr||'','','textarea')}
        ${_hpField('ct-tech-name','科技公司名称',d.techName||'','')}
        ${_hpField('ct-tech-addr','科技公司地址',d.techAddr||'','','textarea')}
        ${_hpField('ct-phone','联系电话',d.phone||'','如 +86-769-8888-0000')}
        ${_hpField('ct-email','联系邮箱',d.email||'','如 info@hondvo.com')}
        ${_hpField('ct-workhours','工作时间',d.workHours||'','如"周一至周五 8:00 - 17:30"')}
        ${_hpField('ct-map','地图嵌入代码',d.mapEmbed||'','粘贴百度/高德地图 iframe 嵌入代码','textarea')}
        ${_hpField('ct-social','社交媒体链接',(d.socialLinks||[]).map(l=>l.platform+'|'+l.url).join('\\n'),'每行格式：平台名|链接，如 微信公众号|https://...','textarea')}
      </div>
    </div>
  </div>
  <div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>二维码</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpFieldMedia('ct-qr-image','二维码图片',d.qrImage||'','建议尺寸 140×140px')}
        ${_hpField('ct-qr-label','二维码说明',d.qrLabel||'','如"扫码添加企业微信"')}
      </div>
    </div>
  </div>
  <div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>表单文案 — 字段标签</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('ct-fl-name','姓名标签',d.formLabels.name||'','如"姓名"')}
        ${_hpField('ct-fl-company','公司标签',d.formLabels.company||'','如"公司"')}
        ${_hpField('ct-fl-phone','电话标签',d.formLabels.phone||'','如"电话"')}
        ${_hpField('ct-fl-email','邮箱标签',d.formLabels.email||'','如"邮箱"')}
        ${_hpField('ct-fl-type','类型标签',d.formLabels.type||'','如"咨询类型"')}
        ${_hpField('ct-fl-desc','需求标签',d.formLabels.desc||'','如"需求描述"')}
      </div>
    </div>
  </div>
  <div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>表单文案 — 占位提示</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('ct-fp-name','姓名占位',d.formPlaceholders.name||'','如"请输入您的姓名"')}
        ${_hpField('ct-fp-company','公司占位',d.formPlaceholders.company||'','如"请输入公司名称"')}
        ${_hpField('ct-fp-phone','电话占位',d.formPlaceholders.phone||'','如"请输入联系电话"')}
        ${_hpField('ct-fp-email','邮箱占位',d.formPlaceholders.email||'','如"请输入邮箱地址"')}
        ${_hpField('ct-fp-desc','需求占位',d.formPlaceholders.desc||'','详细说明','textarea')}
      </div>
    </div>
  </div>
  <div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>表单文案 — 询盘类型与提交</h3></div>
    <div class="card-body">
      <div class="hp-slide-bar">${foTabs}${foDel}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_ctFoAdd()">+ 新增选项</button></div>
      <div class="hp-form-grid">
        ${_hpField('ct-fo-text','选项文字',curFo,'如"医疗器械注塑件"')}
        ${_hpField('ct-submit','提交按钮文字',d.formSubmit||'','如"提交"')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_ctSave()">保存全部</button></div>
    </div>
  </div>`;
}
function _ctPcSelect(idx){ _ctState.pcIdx=idx; document.getElementById('main-content-inner').innerHTML = renderContact(); }
function _ctPcAdd(){ DB.contact.purchaseCards.push({title:'',btnText:''}); _ctState.pcIdx = DB.contact.purchaseCards.length-1; saveData(); document.getElementById('main-content-inner').innerHTML = renderContact(); }
function _ctPcDelete(idx){ if (DB.contact.purchaseCards.length<=1) return; DB.contact.purchaseCards.splice(idx,1); _ctState.pcIdx = Math.min(_ctState.pcIdx, DB.contact.purchaseCards.length-1); saveData(); document.getElementById('main-content-inner').innerHTML = renderContact(); toast('已删除'); }
function _ctFoSelect(idx){ _ctState.foIdx=idx; document.getElementById('main-content-inner').innerHTML = renderContact(); }
function _ctFoAdd(){ DB.contact.formOptions.push(''); _ctState.foIdx = DB.contact.formOptions.length-1; saveData(); document.getElementById('main-content-inner').innerHTML = renderContact(); }
function _ctFoDelete(idx){ if (DB.contact.formOptions.length<=1) return; DB.contact.formOptions.splice(idx,1); _ctState.foIdx = Math.min(_ctState.foIdx, DB.contact.formOptions.length-1); saveData(); document.getElementById('main-content-inner').innerHTML = renderContact(); toast('已删除'); }
function _ctSave() {
  const d = DB.contact;
  d.bannerTitle = document.getElementById('ct-banner-title').value.trim();
  d.bannerSub = document.getElementById('ct-banner-sub').value.trim();
  d.otherTitle = document.getElementById('ct-other-title').value.trim();
  d.moldName = document.getElementById('ct-mold-name').value.trim();
  d.moldAddr = document.getElementById('ct-mold-addr').value.trim();
  d.techName = document.getElementById('ct-tech-name').value.trim();
  d.techAddr = document.getElementById('ct-tech-addr').value.trim();
  d.phone = document.getElementById('ct-phone').value.trim();
  d.email = document.getElementById('ct-email').value.trim();
  d.workHours = document.getElementById('ct-workhours').value.trim();
  d.mapEmbed = document.getElementById('ct-map').value.trim();
  d.qrImage = document.getElementById('ct-qr-image').value;
  d.qrLabel = document.getElementById('ct-qr-label').value.trim();
  d.formLabels.name = document.getElementById('ct-fl-name').value.trim();
  d.formLabels.company = document.getElementById('ct-fl-company').value.trim();
  d.formLabels.phone = document.getElementById('ct-fl-phone').value.trim();
  d.formLabels.email = document.getElementById('ct-fl-email').value.trim();
  d.formLabels.type = document.getElementById('ct-fl-type').value.trim();
  d.formLabels.desc = document.getElementById('ct-fl-desc').value.trim();
  d.formPlaceholders.name = document.getElementById('ct-fp-name').value.trim();
  d.formPlaceholders.company = document.getElementById('ct-fp-company').value.trim();
  d.formPlaceholders.phone = document.getElementById('ct-fp-phone').value.trim();
  d.formPlaceholders.email = document.getElementById('ct-fp-email').value.trim();
  d.formPlaceholders.desc = document.getElementById('ct-fp-desc').value.trim();
  d.formSubmit = document.getElementById('ct-submit').value.trim();
  d.purchaseCards[_ctState.pcIdx] = {
    title: document.getElementById('ct-pc-title').value.trim(),
    btnText: document.getElementById('ct-pc-btn').value.trim()
  };
  d.formOptions[_ctState.foIdx] = document.getElementById('ct-fo-text').value.trim();
  const raw = document.getElementById('ct-social').value.trim();
  d.socialLinks = raw ? raw.split('\\n').map(line=>{
    const parts = line.split('|');
    return {platform:(parts[0]||'').trim(), url:(parts[1]||'').trim()};
  }).filter(l=>l.platform) : [];
  saveData(); toast('已保存');
}


// ═══════════════════════════════════════════
// NEWS EDITOR (新闻动态编辑面板)
// ═══════════════════════════════════════════
function renderNewsEditor() {
  const d = DB.newsPage;
  return `<div class="card hp-editor" style="margin-bottom:24px">
    <div class="card-header"><h3>新闻页面设置</h3></div>
    <div class="card-body">
      <div class="hp-form-grid">
        ${_hpField('ne-banner','Banner 标题',d.bannerTitle||'','页面顶部大标题，如"新闻动态"')}
        ${_hpField('ne-sub','Banner 副标题',d.bannerSub||'','Banner 下方简介文字，如"公司新闻 · 行业资讯"','textarea')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_neSave()">保存页面设置</button></div>
    </div>
  </div>
  <div class="card hp-editor">
    <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
      <h3>新闻列表</h3>
      <button class="btn btn-primary" onclick="openAddModal('news')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        新增新闻
      </button>
    </div>
    <div class="card-body" style="padding:0">
      <div class="toolbar" style="border-bottom:none;padding:12px 16px">
        <div class="search-box">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="搜索新闻..." id="search-news-editor" oninput="_neFilter()">
        </div>
      </div>
      <div class="table-wrap" id="table-news-editor">
        ${renderNewsTable(DB.news)}
      </div>
    </div>
  </div>`;
}
function _neSave() {
  const d = DB.newsPage;
  d.bannerTitle = document.getElementById('ne-banner').value.trim();
  d.bannerSub = document.getElementById('ne-sub').value.trim();
  saveData(); toast('页面设置已保存');
}
function _neFilter() {
  const q = document.getElementById('search-news-editor').value.toLowerCase();
  const data = DB.news.filter(n => String(n.title||'').toLowerCase().includes(q));
  document.getElementById('table-news-editor').innerHTML = renderNewsTable(data);
}

// ═══════════════════════════════════════════
// NEWS EDITOR HELPERS（新闻编辑页增删改）
// ═══════════════════════════════════════════
function renderNewsTable(data) {
  return `<table>
    <thead><tr><th>编号</th><th>标题</th><th>分类</th><th>日期</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>${data.map(n=>`
      <tr>
        <td>#${n.id}</td>
        <td style="font-weight:600;max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(n.title)}</td>
        <td><span class="badge badge-info">${esc(n.cat)}</span></td>
        <td>${n.date}</td>
        <td>${n.status==='published'?'<span class="badge badge-success">已发布</span>':'<span class="badge badge-gray">草稿</span>'}</td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="openEditModal('news',${n.id})">编辑</button>
          <button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="deleteItem('news',${n.id})">删除</button>
        </td>
      </tr>`).join('')}</tbody></table>`;
}

function renderNewsForm(item) {
  return `<form id="modal-form">
    <div class="form-inline">
      <div class="form-group form-group-full"><label>标题 *</label><input class="form-input" name="title" value="${esc(item.title||'')}" required></div>
      <div class="form-group"><label>分类</label><select class="form-input" name="cat"><option value="公司新闻" ${item.cat==='公司新闻'?'selected':''}>公司新闻</option><option value="行业资讯" ${item.cat==='行业资讯'?'selected':''}>行业资讯</option></select></div>
      <div class="form-group"><label>日期 *</label><input class="form-input" type="date" name="date" value="${item.date||''}" required></div>
      <div class="form-group form-group-full"><label>摘要</label><textarea class="form-input" name="summary">${esc(item.summary||'')}</textarea></div>
      <div class="form-group form-group-full"><label>正文内容</label><textarea class="form-input" name="content" style="min-height:120px">${esc(item.content||'')}</textarea></div>
      <div class="form-group"><label>状态</label><select class="form-input" name="status"><option value="published" ${item.status==='published'?'selected':''}>已发布</option><option value="draft" ${item.status==='draft'?'selected':''}>草稿</option></select></div>
      <div class="form-group"><label>封面地址</label><input class="form-input" name="image" value="${esc(item.image||'')}"></div>
    </div></form>`;
}

function openAddModal(key) {
  openModal('新增新闻', renderNewsForm({}), function(){
    const item = collectFormData(key);
    if (!item) return;
    item.id = DB.nextId[key]++;
    DB[key].push(item);
    saveData();
    closeModal();
    navigateTo('edit-news-content');
    toast('新闻已添加');
  });
}

function openEditModal(key,id) {
  const item = DB[key].find(x=>x.id===id);
  if (!item) return;
  openModal('编辑新闻', renderNewsForm(item), function(){
    const updated = collectFormData(key);
    if (!updated) return;
    Object.assign(item, updated);
    saveData();
    closeModal();
    navigateTo('edit-news-content');
    toast('新闻已更新');
  });
}

function deleteItem(key,id) {
  if (!confirm('确定要删除此新闻吗？此操作不可恢复。')) return;
  DB[key] = DB[key].filter(x=>x.id!==id);
  saveData();
  navigateTo('edit-news-content');
  toast('新闻已删除');
}

function collectFormData(key) {
  const form = document.getElementById('modal-form');
  if (!form) return null;
  const fd = new FormData(form);
  const data = {};
  for (let [k,v] of fd.entries()) data[k] = v;
  return data;
}

// ═══════════════════════════════════════════
// MEDIA LIBRARY (媒体库)
// ═══════════════════════════════════════════
const MEDIA_CATS = ['产品图','证书图','新闻图','设备图','Logo','其他'];
let _mediaState = {search:'', cat:'全部'};

function mediaRef(id) { return 'media:' + id; }

function _mediaFormatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

function filterMedia() {
  const q = (_mediaState.search || '').toLowerCase();
  return DB.media.filter(function(m){
    const nameMatch = String(m.name || '').toLowerCase().indexOf(q) !== -1;
    const catMatch = _mediaState.cat === '全部' || m.cat === _mediaState.cat;
    return nameMatch && catMatch;
  });
}

function renderMediaItem(m) {
  return `
    <div class="media-item" data-id="${m.id}">
      <img class="thumb" src="${m.dataUrl}" alt="${escHtml(m.name)}" onclick="_mediaView(${m.id})" title="点击查看大图">
      <div class="media-info">
        <div class="media-name" onclick="_mediaView(${m.id})" title="${escHtml(m.name)}">${escHtml(m.name)}</div>
        <div class="media-meta">
          <span class="media-cat">${escHtml(m.cat)}</span>
          <span class="media-size">${_mediaFormatSize(m.size || 0)}</span>
        </div>
        <div class="media-actions">
          <button class="media-act" onclick="_mediaRename(${m.id})">重命名</button>
          <button class="media-act" onclick="_mediaCopyRef(${m.id})">复制引用</button>
          <button class="media-act danger" onclick="_mediaDelete(${m.id})">删除</button>
        </div>
      </div>
    </div>`;
}

function renderMediaPage() {
  const items = filterMedia();
  const chips = ['全部'].concat(MEDIA_CATS).map(function(c){
    return `<button class="media-filter-chip ${_mediaState.cat===c?'active':''}" onclick="_mediaSetCat('${c}')">${c}</button>`;
  }).join('');
  const grid = items.length
    ? `<div class="media-grid">${items.map(renderMediaItem).join('')}</div>`
    : `<div class="empty-state">
        <svg viewBox="0 0 24 24" style="width:48px;height:48px;stroke:#94a3b8;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <p>暂无图片，点击上方区域上传</p>
      </div>`;
  return `
    <div class="card hp-editor">
      <div class="card-header"><h3>媒体库</h3></div>
      <div class="card-body">
        <div style="background:var(--brand-soft);border:1px solid rgba(225,107,36,.22);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--brand);margin-bottom:16px">
          在其他编辑模块的图片字段中粘贴引用路径（如 <code style="font-weight:600">media:1</code>）即可引用媒体库图片。
        </div>
        <div class="media-dropzone" onclick="document.getElementById('media-file-input').click()">
          <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <p>点击上传图片</p>
          <div class="sub">支持多选 · 单张不超过 2MB</div>
        </div>
        <input type="file" accept="image/*" multiple id="media-file-input" style="display:none" onchange="_mediaUpload(this)">
        <div class="media-toolbar">
          <div class="search-box">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="按名称搜索..." id="media-search" value="${escHtml(_mediaState.search)}" oninput="_mediaSearch(this.value)">
          </div>
          <div class="media-filter">${chips}</div>
        </div>
        ${grid}
      </div>
    </div>`;
}

function _mediaUpload(input) {
  const files = Array.prototype.slice.call(input.files || []);
  input.value = '';
  if (!files.length) return;
  const snapshotMedia = DB.media.slice();
  const snapshotNextId = DB.nextId.media;
  let ok = 0, skip = 0, pending = files.length;
  files.forEach(function(file){
    if (file.size > 2*1024*1024 || !/^image\//.test(file.type)) {
      skip++; pending--;
      if (pending === 0) _mediaUploadDone(ok, skip, snapshotMedia, snapshotNextId);
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e){
      DB.media.push({
        id: DB.nextId.media++,
        name: file.name.replace(/\.[^.]+$/,''),
        cat: '其他',
        dataUrl: e.target.result,
        size: file.size,
        createdAt: Date.now()
      });
      ok++; pending--;
      if (pending === 0) _mediaUploadDone(ok, skip, snapshotMedia, snapshotNextId);
    };
    reader.onerror = function(){ skip++; pending--; if (pending === 0) _mediaUploadDone(ok, skip, snapshotMedia, snapshotNextId); };
    reader.readAsDataURL(file);
  });
}

function _mediaUploadDone(ok, skip, snapshotMedia, snapshotNextId) {
  try {
    saveData();
  } catch(e) {
    DB.media = snapshotMedia;
    DB.nextId.media = snapshotNextId;
    toast('存储空间不足：浏览器本地存储容量有限，请减少图片数量或改用更小的图片', 'error');
    document.getElementById('main-content-inner').innerHTML = renderMediaPage();
    return;
  }
  document.getElementById('main-content-inner').innerHTML = renderMediaPage();
  if (ok > 0) toast('已上传 ' + ok + ' 张图片' + (skip ? '，跳过 ' + skip + ' 个文件' : ''));
  else toast('上传失败：仅支持 2MB 以内的图片文件', 'error');
}

function _mediaDelete(id) {
  const m = DB.media.find(function(x){ return x.id === id; });
  if (!m) return;
  openModal('确认删除', '<p>确定要删除图片「' + escHtml(m.name) + '」吗？删除后引用该图片的位置将无法显示。</p>', function(){
    DB.media = DB.media.filter(function(x){ return x.id !== id; });
    saveData(); closeModal();
    document.getElementById('main-content-inner').innerHTML = renderMediaPage();
    toast('图片已删除');
  });
}

function _mediaRename(id) {
  const m = DB.media.find(function(x){ return x.id === id; });
  if (!m) return;
  const catOptions = MEDIA_CATS.map(function(c){
    return '<option value="' + c + '"' + (m.cat === c ? ' selected' : '') + '>' + c + '</option>';
  }).join('');
  openModal('重命名图片',
    '<div class="form-group" style="margin-bottom:16px"><label class="form-label">图片名称</label>' +
    '<input type="text" class="form-input" id="media-rename-input" value="' + escHtml(m.name) + '"></div>' +
    '<div class="form-group"><label class="form-label">分类</label>' +
    '<select class="form-input" id="media-rename-cat">' + catOptions + '</select></div>',
    function(){
      m.name = document.getElementById('media-rename-input').value.trim() || m.name;
      m.cat = document.getElementById('media-rename-cat').value;
      saveData(); closeModal();
      document.getElementById('main-content-inner').innerHTML = renderMediaPage();
      toast('已保存');
    });
}

function _mediaCopyRef(id) {
  const ref = mediaRef(id);
  copyToClipboard(ref).then(function(){ toast('已复制引用路径：' + ref); }).catch(function(){ toast('复制失败，请手动复制：' + ref, 'error'); });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function(resolve, reject){
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); resolve(); } catch(e){ reject(e); }
    document.body.removeChild(ta);
  });
}

function _mediaView(id) {
  const m = DB.media.find(function(x){ return x.id === id; });
  if (!m) return;
  const overlay = document.createElement('div');
  overlay.className = 'media-viewer-overlay';
  overlay.onclick = function(e){ if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML =
    '<img src="' + m.dataUrl + '" alt="' + escHtml(m.name) + '">' +
    '<button class="mv-close" onclick="this.parentElement.remove()">×</button>' +
    '<div class="mv-info"><span>' + escHtml(m.name) + '</span>' +
    '<span style="color:#94a3b8">' + escHtml(m.cat) + ' · ' + _mediaFormatSize(m.size || 0) + '</span>' +
    '<button class="btn btn-sm btn-primary" onclick="_mediaCopyRef(' + m.id + ')">复制引用路径</button></div>';
  document.body.appendChild(overlay);
}

function _mediaSearch(v) { _mediaState.search = v; document.getElementById('main-content-inner').innerHTML = renderMediaPage(); }
function _mediaSetCat(c) { _mediaState.cat = c; document.getElementById('main-content-inner').innerHTML = renderMediaPage(); }

// ═══════════════════════════════════════════
// PUBLISH CONTROL (发布控制)
// ═══════════════════════════════════════════

function bumpPatch(ver) { return [ver[0], ver[1], ver[2] + 1]; }
function fmtVersion(ver) { return 'v' + ver.join('.'); }

function snapshotDB() {
  const snap = JSON.parse(JSON.stringify(DB));
  delete snap.publishHistory;
  delete snap.publishVersion;
  delete snap.hasUnpublished;
  delete snap.publishNotes;
  return snap;
}

function getPublishState() {
  if (!DB.publishHistory || !DB.publishHistory.length) return 'draft';
  if (DB.hasUnpublished) return 'unpublished';
  return 'published';
}

function doPublish() {
  const note = (document.getElementById('publish-notes').value || '').trim();
  DB.publishVersion = bumpPatch(DB.publishVersion);
  const rec = {
    version: fmtVersion(DB.publishVersion),
    time: Date.now(),
    operator: '管理员',
    note: note,
    snapshot: snapshotDB()
  };
  DB.publishHistory.unshift(rec);
  DB.hasUnpublished = false;
  DB.publishNotes = '';
  document.getElementById('publish-notes').value = '';
  saveData(false);
  toast('已发布 ' + rec.version);

  // ── 异步发送到后端服务（失败不阻塞） ──
  _publishToServer(DB, note);
}

// ── 物化 media:N 引用 → base64 dataUrl（发布时递归替换，前端无需解析引用） ──
function _materializeRefs(obj){
  if (typeof obj === 'string') {
    var m = /^media:(\d+)$/.exec(obj);
    if (m) {
      var mm = DB.media.find(function(x){ return x.id === parseInt(m[1],10); });
      return mm && mm.dataUrl ? mm.dataUrl : obj;
    }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(_materializeRefs);
  if (obj && typeof obj === 'object') {
    var out = {};
    for (var k in obj) if (obj.hasOwnProperty(k)) out[k] = _materializeRefs(obj[k]);
    return out;
  }
  return obj;
}

// ── 异步发送发布数据到后端服务 ──
function _publishToServer(db, note) {
  var payload = {
    version: db.publishVersion,
    note: note || '',
    content: {},
    i18n: db.i18n || []
  };

  // 从 DB 中提取所有结构化内容（排除非内容字段）
  var contentKeys = [
    'homepage', 'about', 'products', 'news', 'certificates',
    'equipment', 'partners', 'pageAnalytics', 'visits', 'inquiries',
    'settings', 'qual', 'contact', 'newsPage', 'productsPage', 'moldPage'
  ];
  for (var i = 0; i < contentKeys.length; i++) {
    var key = contentKeys[i];
    if (db[key] !== undefined) {
      payload.content[key] = db[key];
    }
  }
  // 物化媒体引用（media:N → base64 URL），前端直接可用
  payload.content = _materializeRefs(payload.content);

  var API = '/api/publish';

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      console.log('[Publish-Server] 发布成功:', data.version, data.count, 'sections');
    } else {
      console.warn('[Publish-Server] 服务器返回错误:', data.error);
    }
  })
  .catch(function(e) {
    // 后端未启动时静默失败，数据已保存在 localStorage
    console.log('[Publish-Server] 后端未连接，数据仅保存在本地 (' + e.message + ')');
  });
}

function doSaveDraft() {
  const note = (document.getElementById('publish-notes').value || '').trim();
  DB.publishNotes = note;
  DB.hasUnpublished = true;
  saveData(false);
  toast('已存为草稿');
}

function renderPublishStatus() {
  const state = getPublishState();
  const dot = document.getElementById('publish-status-dot');
  const txt = document.getElementById('publish-status-text');
  if (!dot || !txt) return;
  const map = {
    draft:       { color: 'var(--slate-400)', text: '草稿' },
    published:   { color: '#22c55e',         text: '已发布' },
    unpublished: { color: 'var(--danger)',   text: '有未发布改动' }
  };
  const s = map[state] || map.draft;
  dot.style.background = s.color;
  txt.textContent = s.text;
}

function renderPublishHistory() {
  const list = document.getElementById('publish-history-list');
  if (!list) return;
  const hist = DB.publishHistory || [];
  if (!hist.length) {
    list.innerHTML = '<div class="publish-history-empty">暂无发布记录</div>';
    return;
  }
  let html = '';
  for (let i = 0; i < hist.length; i++) {
    const r = hist[i];
    const t = new Date(r.time);
    const timeStr = t.getFullYear() + '-' +
      String(t.getMonth() + 1).padStart(2, '0') + '-' +
      String(t.getDate()).padStart(2, '0') + ' ' +
      String(t.getHours()).padStart(2, '0') + ':' +
      String(t.getMinutes()).padStart(2, '0');
    const note = escHtml(r.note || '');
    html += '<div class="ph-item">' +
      '<div class="ph-ver">' + escHtml(r.version) + '</div>' +
      '<div class="ph-meta">' + timeStr + ' · ' + escHtml(r.operator || '管理员') + '</div>' +
      (note ? '<div class="ph-note">' + note + '</div>' : '') +
      '</div>';
  }
  list.innerHTML = html;
}

function updatePublishPanel() {
  const panel = document.getElementById('publish-panel');
  const body = document.querySelector('.main-body');
  if (!panel || !body) return;

  const isEdit = _currentPage ? (_currentPage.indexOf('edit-') === 0) : false;
  if (isEdit) body.classList.add('has-publish');
  else body.classList.remove('has-publish');

  const verEl = document.getElementById('publish-version');
  if (verEl) verEl.textContent = fmtVersion(DB.publishVersion);

  const flag = document.getElementById('publish-unpub-flag');
  if (flag) flag.hidden = !DB.hasUnpublished;

  renderPublishStatus();
  renderPublishHistory();
}

function bindPublishEvents() {
  const pubBtn = document.getElementById('btn-publish');
  const draftBtn = document.getElementById('btn-draft');
  if (pubBtn) pubBtn.addEventListener('click', doPublish);
  if (draftBtn) draftBtn.addEventListener('click', doSaveDraft);
}

(function initPublish() {
  bindPublishEvents();
  const notesEl = document.getElementById('publish-notes');
  if (notesEl && DB.publishNotes) notesEl.value = DB.publishNotes;
  _currentPage = 'dashboard';
  updatePublishPanel();
})();

// ═══════════════════════════════════════════
// PRODUCTS PAGE (产品与服务页面编辑)
// ═══════════════════════════════════════════
let _ppState = {catIdx:0, itemIdx:0};
function renderProductsPage() {
  const d = DB.productsPage;
  if (!d.categories || d.categories.length === 0) d.categories = [{key:'',icon:'',title:'',desc:''}];
  if (!d.coreItems || d.coreItems.length === 0) d.coreItems = [{image:'',title:'',desc:'',link:''}];
  const cats = d.categories;
  const curCat = cats[_ppState.catIdx] || {};
  const items = d.coreItems;
  const curItem = items[_ppState.itemIdx] || {};
  const catTabs = cats.map((s,i) => `<button class="hp-slide-tag ${i===_ppState.catIdx?'active':''}" onclick="_ppCatSelect(${i})">分类${i+1}</button>`).join('');
  const catDel = cats.length > 1 ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_ppCatDelete(${_ppState.catIdx})">删除</button>` : '';
  const itemTabs = items.map((s,i) => `<button class="hp-slide-tag ${i===_ppState.itemIdx?'active':''}" onclick="_ppItemSelect(${i})">产品卡${i+1}</button>`).join('');
  const itemDel = items.length > 1 ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_ppItemDelete(${_ppState.itemIdx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>产品与服务 — 页面编辑</h3></div>
    <div class="card-body">
      <div class="hp-sub-section">Banner 区</div>
      <div class="hp-form-grid">
        ${_hpField('pp-banner-title','Banner 标题',d.bannerTitle||'','如 "产品与服务"')}
        ${_hpField('pp-banner-sub','Banner 副标题',d.bannerSub||'','如 "II类无源医疗器械注塑部件"')}
      </div>
      <div class="hp-sub-section">产品分类折叠栏</div>
      <div class="hp-slide-bar">${catTabs}${catDel}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_ppCatAdd()">+ 新增分类</button></div>
      <div class="hp-form-grid">
        ${_hpField('pp-cat-key','分类标识 key',curCat.key||'','如 lsr / pp / 2k')}
        ${_hpField('pp-cat-icon','图标文字',curCat.icon||'','如 LSR / PP / 2K')}
        ${_hpField('pp-cat-title','分类标题',curCat.title||'','如 "LSR 液体硅胶产品"')}
        ${_hpField('pp-cat-desc','分类描述',curCat.desc||'','详细说明','textarea')}
      </div>
      <div class="hp-sub-section">核心产品线</div>
      <div class="hp-form-grid">
        ${_hpField('pp-core-title','标题',d.coreTitle||'','如 "核心产品线"')}
        ${_hpField('pp-core-sub','副标题',d.coreSub||'','如 "核心产品线"')}
      </div>
      <div class="hp-slide-bar">${itemTabs}${itemDel}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_ppItemAdd()">+ 新增产品卡</button></div>
      <div class="hp-form-grid">
        ${_hpFieldMedia('pp-item-image','产品图片',curItem.image||'','建议尺寸 800×500px')}
        ${_hpField('pp-item-title','产品标题',curItem.title||'','如 "肠内营养输注系统"')}
        ${_hpField('pp-item-desc','产品描述',curItem.desc||'','详细说明','textarea')}
        ${_hpField('pp-item-link','底部链接文案',curItem.link||'','如 "IQ/OQ/PQ 验证"')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_ppSave()">保存</button></div>
    </div>
  </div>`;
}
function _ppCatSelect(idx){ _ppState.catIdx=idx; document.getElementById('main-content-inner').innerHTML = renderProductsPage(); }
function _ppItemSelect(idx){ _ppState.itemIdx=idx; document.getElementById('main-content-inner').innerHTML = renderProductsPage(); }
function _ppCatAdd(){ DB.productsPage.categories.push({key:'',icon:'',title:'',desc:''}); _ppState.catIdx = DB.productsPage.categories.length-1; saveData(); document.getElementById('main-content-inner').innerHTML = renderProductsPage(); }
function _ppCatDelete(idx){ if (DB.productsPage.categories.length<=1) return; DB.productsPage.categories.splice(idx,1); _ppState.catIdx = Math.min(_ppState.catIdx, DB.productsPage.categories.length-1); saveData(); document.getElementById('main-content-inner').innerHTML = renderProductsPage(); toast('已删除'); }
function _ppItemAdd(){ DB.productsPage.coreItems.push({image:'',title:'',desc:'',link:''}); _ppState.itemIdx = DB.productsPage.coreItems.length-1; saveData(); document.getElementById('main-content-inner').innerHTML = renderProductsPage(); }
function _ppItemDelete(idx){ if (DB.productsPage.coreItems.length<=1) return; DB.productsPage.coreItems.splice(idx,1); _ppState.itemIdx = Math.min(_ppState.itemIdx, DB.productsPage.coreItems.length-1); saveData(); document.getElementById('main-content-inner').innerHTML = renderProductsPage(); toast('已删除'); }
function _ppSave(){
  const d = DB.productsPage;
  d.bannerTitle = document.getElementById('pp-banner-title').value.trim();
  d.bannerSub = document.getElementById('pp-banner-sub').value.trim();
  d.coreTitle = document.getElementById('pp-core-title').value.trim();
  d.coreSub = document.getElementById('pp-core-sub').value.trim();
  const cat = d.categories[_ppState.catIdx];
  cat.key = document.getElementById('pp-cat-key').value.trim();
  cat.icon = document.getElementById('pp-cat-icon').value.trim();
  cat.title = document.getElementById('pp-cat-title').value.trim();
  cat.desc = document.getElementById('pp-cat-desc').value.trim();
  const item = d.coreItems[_ppState.itemIdx];
  item.image = document.getElementById('pp-item-image').value;
  item.title = document.getElementById('pp-item-title').value.trim();
  item.desc = document.getElementById('pp-item-desc').value.trim();
  item.link = document.getElementById('pp-item-link').value.trim();
  saveData(); toast('已保存');
}

// ═══════════════════════════════════════════
// MOLD PAGE (模具中心页面编辑)
// ═══════════════════════════════════════════
let _mpState = {galleryIdx:0, catIdx:0};
function renderMoldPage() {
  const d = DB.moldPage;
  if (!d.gallery || d.gallery.length === 0) d.gallery = [{image:'',desc:''}];
  if (!d.categories || d.categories.length === 0) d.categories = [{key:'',title:''}];
  const gals = d.gallery;
  const curGal = gals[_mpState.galleryIdx] || {};
  const cats = d.categories;
  const curCat = cats[_mpState.catIdx] || {};
  const galTabs = gals.map((s,i) => `<button class="hp-slide-tag ${i===_mpState.galleryIdx?'active':''}" onclick="_mpGalSelect(${i})">图片${i+1}</button>`).join('');
  const galDel = gals.length > 1 ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_mpGalDelete(${_mpState.galleryIdx})">删除</button>` : '';
  const catTabs = cats.map((s,i) => `<button class="hp-slide-tag ${i===_mpState.catIdx?'active':''}" onclick="_mpCatSelect(${i})">分类${i+1}</button>`).join('');
  const catDel = cats.length > 1 ? `<button class="hp-del-btn" style="${_HP_DEL_BTN_STYLE}margin-left:4px;" onclick="_mpCatDelete(${_mpState.catIdx})">删除</button>` : '';
  return `<div class="card hp-editor">
    <div class="card-header"><h3>模具中心 — 页面编辑</h3></div>
    <div class="card-body">
      <div class="hp-sub-section">Banner 区</div>
      <div class="hp-form-grid">
        ${_hpField('mp-banner-title','Banner 标题',d.bannerTitle||'','如 "模具中心"')}
        ${_hpField('mp-banner-sub','Banner 副标题',d.bannerSub||'','如 "世界级设备矩阵..."')}
      </div>
      <div class="hp-sub-section">车间图墙</div>
      <div class="hp-slide-bar">${galTabs}${galDel}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_mpGalAdd()">+ 新增图片</button></div>
      <div class="hp-form-grid">
        ${_hpFieldMedia('mp-gal-image','图片',curGal.image||'','建议尺寸 800×500px')}
        ${_hpField('mp-gal-desc','图片描述',curGal.desc||'','详细说明','textarea')}
      </div>
      <div class="hp-sub-section">验证 Banner</div>
      <div class="hp-form-grid">
        ${_hpField('mp-verify-prefix','前缀文案',d.verifyPrefix||'','如 "IQ/OQ/PQ 验证支持："')}
        ${_hpField('mp-verify-text','正文文案',d.verifyText||'','详细说明','textarea')}
      </div>
      <div class="hp-sub-section">设备分类标题</div>
      <div class="hp-slide-bar">${catTabs}${catDel}<button class="btn btn-sm btn-primary" style="margin-left:8px" onclick="_mpCatAdd()">+ 新增分类</button></div>
      <div class="hp-form-grid">
        ${_hpField('mp-cat-key','分类标识 key',curCat.key||'','如 cnc / edm / wire')}
        ${_hpField('mp-cat-title','分类标题',curCat.title||'','如 "CNC 加工中心（23 台）"')}
      </div>
      <div class="hp-actions"><button class="btn btn-primary btn-lg" onclick="_mpSave()">保存</button></div>
    </div>
  </div>`;
}
function _mpGalSelect(idx){ _mpState.galleryIdx=idx; document.getElementById('main-content-inner').innerHTML = renderMoldPage(); }
function _mpCatSelect(idx){ _mpState.catIdx=idx; document.getElementById('main-content-inner').innerHTML = renderMoldPage(); }
function _mpGalAdd(){ DB.moldPage.gallery.push({image:'',desc:''}); _mpState.galleryIdx = DB.moldPage.gallery.length-1; saveData(); document.getElementById('main-content-inner').innerHTML = renderMoldPage(); }
function _mpGalDelete(idx){ if (DB.moldPage.gallery.length<=1) return; DB.moldPage.gallery.splice(idx,1); _mpState.galleryIdx = Math.min(_mpState.galleryIdx, DB.moldPage.gallery.length-1); saveData(); document.getElementById('main-content-inner').innerHTML = renderMoldPage(); toast('已删除'); }
function _mpCatAdd(){ DB.moldPage.categories.push({key:'',title:''}); _mpState.catIdx = DB.moldPage.categories.length-1; saveData(); document.getElementById('main-content-inner').innerHTML = renderMoldPage(); }
function _mpCatDelete(idx){ if (DB.moldPage.categories.length<=1) return; DB.moldPage.categories.splice(idx,1); _mpState.catIdx = Math.min(_mpState.catIdx, DB.moldPage.categories.length-1); saveData(); document.getElementById('main-content-inner').innerHTML = renderMoldPage(); toast('已删除'); }
function _mpSave(){
  const d = DB.moldPage;
  d.bannerTitle = document.getElementById('mp-banner-title').value.trim();
  d.bannerSub = document.getElementById('mp-banner-sub').value.trim();
  d.verifyPrefix = document.getElementById('mp-verify-prefix').value;
  d.verifyText = document.getElementById('mp-verify-text').value.trim();
  const gal = d.gallery[_mpState.galleryIdx];
  gal.image = document.getElementById('mp-gal-image').value;
  gal.desc = document.getElementById('mp-gal-desc').value.trim();
  const cat = d.categories[_mpState.catIdx];
  cat.key = document.getElementById('mp-cat-key').value.trim();
  cat.title = document.getElementById('mp-cat-title').value.trim();
  saveData(); toast('已保存');
}
