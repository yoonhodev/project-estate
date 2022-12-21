/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap, Polygon } from "react-kakao-maps-sdk";
// eslint-disable-next-line import/no-unresolved
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import axios from "axios";

function RebuildMap() {
  const [keyword, setKeyword] = useState("");

  const changeHandler = (e) => {
    setKeyword(e.target.value);
  };

  const clickHandler = (e) => {
    // eslint-disable-next-line no-use-before-define
    searchAndShowPlaces();
    setKeyword("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      clickHandler();
    }
  };

  const { kakao } = window;
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [tableData, setTableData] = useState(null);
  const [gu, setGu] = useState("");
  const [rebuildData, setRebuildData] = useState([]);

  const searchAndShowPlaces = () => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        // eslint-disable-next-line no-shadow
        const markers = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        map.setBounds(bounds);
      }
    });
  };
  useEffect(() => {
    const loadRebuildInfo = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8080/web-scraping/openapi/rebuildInfo?gu=${gu}`
      );
      // const response = await axios.get(`/react-team3/news?start=${startNum}&query=${query}`);
      const { columns, rows } = AuthorsTableData(response.data);
      setTableData({ columns, rows });
      setRebuildData(response.data);
      // eslint-disable-next-line no-console
      console.log(response.data);
    };
    loadRebuildInfo();
  }, [gu]);
  useEffect(() => {
    searchAndShowPlaces();
  }, [map]);
  const [areas, setAreas] = useState([
    {
      name: "용산구",
      isMouseover: false,
      path: [
        { lat: 37.5548768201904, lng: 126.96966524449994 },
        { lat: 37.55308718044556, lng: 126.97642899633566 },
        { lat: 37.55522076659584, lng: 126.97654602427454 },
        { lat: 37.55320655210504, lng: 126.97874667968763 },
        { lat: 37.55368689494708, lng: 126.98541456064552 },
        { lat: 37.54722934282707, lng: 126.995229135048 },
        { lat: 37.549694559809545, lng: 126.99832516302801 },
        { lat: 37.550159406110104, lng: 127.00436818301327 },
        { lat: 37.54820235864802, lng: 127.0061334023129 },
        { lat: 37.546169758665414, lng: 127.00499711608721 },
        { lat: 37.54385947805103, lng: 127.00727818360471 },
        { lat: 37.54413326436179, lng: 127.00898460651953 },
        { lat: 37.539639030116945, lng: 127.00959054834321 },
        { lat: 37.537681185520256, lng: 127.01726163044557 },
        { lat: 37.53378887274516, lng: 127.01719284893274 },
        { lat: 37.52290225898471, lng: 127.00614038053493 },
        { lat: 37.51309192794448, lng: 126.99070240960813 },
        { lat: 37.50654651085339, lng: 126.98553683648308 },
        { lat: 37.50702053393398, lng: 126.97524914998174 },
        { lat: 37.51751820477105, lng: 126.94988506562748 },
        { lat: 37.52702918583156, lng: 126.94987870367682 },
        { lat: 37.534519656862926, lng: 126.94481851935942 },
        { lat: 37.537500243531994, lng: 126.95335659960566 },
        { lat: 37.54231338779177, lng: 126.95817394011969 },
        { lat: 37.54546318600178, lng: 126.95790512689311 },
        { lat: 37.548791603525764, lng: 126.96371984820232 },
        { lat: 37.55155543391863, lng: 126.96233786542686 },
        { lat: 37.5541513366375, lng: 126.9657135934734 },
        { lat: 37.55566236579088, lng: 126.9691850696746 },
        { lat: 37.5548768201904, lng: 126.96966524449994 },
      ],
    },
    {
      name: "중구",
      isMouseover: false,
      path: [
        { lat: 37.544062989758594, lng: 127.00854659142894 },
        { lat: 37.54385947805103, lng: 127.00727818360471 },
        { lat: 37.546169758665414, lng: 127.00499711608721 },
        { lat: 37.54820235864802, lng: 127.0061334023129 },
        { lat: 37.550159406110104, lng: 127.00436818301327 },
        { lat: 37.549694559809545, lng: 126.99832516302801 },
        { lat: 37.54722934282707, lng: 126.995229135048 },
        { lat: 37.55368689494708, lng: 126.98541456064552 },
        { lat: 37.55320655210504, lng: 126.97874667968763 },
        { lat: 37.55522076659584, lng: 126.97654602427454 },
        { lat: 37.55308718044556, lng: 126.97642899633566 },
        { lat: 37.55487749311664, lng: 126.97240854546743 },
        { lat: 37.5548766923893, lng: 126.9691718124876 },
        { lat: 37.55566236579088, lng: 126.9691850696746 },
        { lat: 37.55155543391863, lng: 126.96233786542686 },
        { lat: 37.55498984534305, lng: 126.96173858545431 },
        { lat: 37.55695455613004, lng: 126.96343068837372 },
        { lat: 37.5590262922649, lng: 126.9616731414449 },
        { lat: 37.56197662569172, lng: 126.96946316364357 },
        { lat: 37.56582132960869, lng: 126.96669525397355 },
        { lat: 37.56824746386509, lng: 126.96909838710842 },
        { lat: 37.569485309984174, lng: 126.97637402412326 },
        { lat: 37.56810323716611, lng: 126.98905202099309 },
        { lat: 37.56961739576364, lng: 127.00225936812329 },
        { lat: 37.56966688588187, lng: 127.0152677241078 },
        { lat: 37.572022763755164, lng: 127.0223363152772 },
        { lat: 37.57190723475508, lng: 127.02337770475695 },
        { lat: 37.56973041414113, lng: 127.0234585247501 },
        { lat: 37.565200182350495, lng: 127.02358387477513 },
        { lat: 37.56505173515675, lng: 127.02678930885806 },
        { lat: 37.563390358462826, lng: 127.02652159646888 },
        { lat: 37.5607276739534, lng: 127.02339232029838 },
        { lat: 37.55779412537163, lng: 127.0228934248264 },
        { lat: 37.556850715898484, lng: 127.01807638779917 },
        { lat: 37.55264513061776, lng: 127.01620129137214 },
        { lat: 37.547466935106435, lng: 127.00931996404753 },
        { lat: 37.54502351209897, lng: 127.00815187343248 },
        { lat: 37.544062989758594, lng: 127.00854659142894 },
      ],
    },
    {
      name: "종로구",
      isMouseover: false,
      path: [
        { lat: 37.631840777111364, lng: 126.9749313865046 },
        { lat: 37.632194205253654, lng: 126.97609588529602 },
        { lat: 37.629026103322374, lng: 126.97496405167149 },
        { lat: 37.6285585388996, lng: 126.97992605309885 },
        { lat: 37.626378096236195, lng: 126.97960492198952 },
        { lat: 37.6211493968146, lng: 126.98365245774505 },
        { lat: 37.6177725051378, lng: 126.9837302191854 },
        { lat: 37.613985109550605, lng: 126.98658977758268 },
        { lat: 37.611364924201304, lng: 126.98565700183143 },
        { lat: 37.60401657024552, lng: 126.98665951539246 },
        { lat: 37.60099164566844, lng: 126.97852019816328 },
        { lat: 37.59790270809407, lng: 126.97672287261275 },
        { lat: 37.59447673441787, lng: 126.98544283754865 },
        { lat: 37.59126960661375, lng: 126.98919808879788 },
        { lat: 37.592300831997434, lng: 127.0009511248032 },
        { lat: 37.58922302426079, lng: 127.00228260552726 },
        { lat: 37.586091007146834, lng: 127.00667090686603 },
        { lat: 37.58235007703611, lng: 127.00677925856456 },
        { lat: 37.58047228501006, lng: 127.00863575242668 },
        { lat: 37.58025588757531, lng: 127.01058748333907 },
        { lat: 37.582338528091164, lng: 127.01483104096094 },
        { lat: 37.581693162424465, lng: 127.01673289259993 },
        { lat: 37.57758802896556, lng: 127.01812215416163 },
        { lat: 37.5788668917658, lng: 127.02140099081309 },
        { lat: 37.578034045208426, lng: 127.02313962015988 },
        { lat: 37.57190723475508, lng: 127.02337770475695 },
        { lat: 37.56966688588187, lng: 127.0152677241078 },
        { lat: 37.56961739576364, lng: 127.00225936812329 },
        { lat: 37.5681357695346, lng: 126.99014772014593 },
        { lat: 37.569315246023024, lng: 126.9732046364419 },
        { lat: 37.56824746386509, lng: 126.96909838710842 },
        { lat: 37.56582132960869, lng: 126.96669525397355 },
        { lat: 37.57874076105342, lng: 126.95354824618335 },
        { lat: 37.581020184166476, lng: 126.95812059678624 },
        { lat: 37.59354736740056, lng: 126.95750665936443 },
        { lat: 37.595061575856455, lng: 126.9590412421402 },
        { lat: 37.59833350100327, lng: 126.9576941779143 },
        { lat: 37.59875701675023, lng: 126.95306020161668 },
        { lat: 37.602476031211225, lng: 126.95237386792348 },
        { lat: 37.60507154496655, lng: 126.95404376087069 },
        { lat: 37.60912809443569, lng: 126.95032198271032 },
        { lat: 37.615539700280216, lng: 126.95072546923387 },
        { lat: 37.62433621196653, lng: 126.94900237336302 },
        { lat: 37.62642708817027, lng: 126.95037844036497 },
        { lat: 37.629590994617104, lng: 126.95881385457929 },
        { lat: 37.629794440379136, lng: 126.96376660599225 },
        { lat: 37.632373740990175, lng: 126.97302793692637 },
        { lat: 37.631840777111364, lng: 126.9749313865046 },
      ],
    },
    {
      name: "서대문구",
      isMouseover: false,
      path: [
        { lat: 37.59851932019209, lng: 126.95347706883003 },
        { lat: 37.5992407011344, lng: 126.95499403097206 },
        { lat: 37.59833350100327, lng: 126.9576941779143 },
        { lat: 37.595061575856455, lng: 126.9590412421402 },
        { lat: 37.59354736740056, lng: 126.95750665936443 },
        { lat: 37.581020184166476, lng: 126.95812059678624 },
        { lat: 37.57874076105342, lng: 126.95354824618335 },
        { lat: 37.56197662569172, lng: 126.96946316364357 },
        { lat: 37.5575156365052, lng: 126.95991288916548 },
        { lat: 37.55654562007193, lng: 126.9413708153468 },
        { lat: 37.555098093384, lng: 126.93685861757348 },
        { lat: 37.55884751347576, lng: 126.92659242918415 },
        { lat: 37.5633319104926, lng: 126.92828128083327 },
        { lat: 37.56510367293256, lng: 126.92601582346325 },
        { lat: 37.57082994377989, lng: 126.9098094620638 },
        { lat: 37.57599550420081, lng: 126.902091747923 },
        { lat: 37.587223103650295, lng: 126.91284666446226 },
        { lat: 37.58541570520177, lng: 126.91531241017965 },
        { lat: 37.585870567159255, lng: 126.91638068573187 },
        { lat: 37.583095195853055, lng: 126.9159399866114 },
        { lat: 37.583459593417196, lng: 126.92175886498167 },
        { lat: 37.587104600730505, lng: 126.92388813813815 },
        { lat: 37.588386594820484, lng: 126.92800815682232 },
        { lat: 37.59157595859555, lng: 126.92776504133688 },
        { lat: 37.59455434247408, lng: 126.93027139545339 },
        { lat: 37.59869748704149, lng: 126.94088480070904 },
        { lat: 37.60065830191363, lng: 126.9414041615336 },
        { lat: 37.60305781086164, lng: 126.93995273804141 },
        { lat: 37.610598531321436, lng: 126.95037536795142 },
        { lat: 37.6083605525023, lng: 126.95056259057313 },
        { lat: 37.60507154496655, lng: 126.95404376087069 },
        { lat: 37.602476031211225, lng: 126.95237386792348 },
        { lat: 37.59851932019209, lng: 126.95347706883003 },
      ],
    },
    {
      name: "동대문구",
      isMouseover: false,
      path: [
        { lat: 37.607062869017085, lng: 127.07111288773496 },
        { lat: 37.60107201319839, lng: 127.07287376670605 },
        { lat: 37.59724304056685, lng: 127.06949105186925 },
        { lat: 37.58953367466315, lng: 127.07030363208528 },
        { lat: 37.58651213184981, lng: 127.07264218709383 },
        { lat: 37.5849555116177, lng: 127.07216063016078 },
        { lat: 37.58026781100598, lng: 127.07619547037923 },
        { lat: 37.571869232268774, lng: 127.0782018408153 },
        { lat: 37.559961773835425, lng: 127.07239004251258 },
        { lat: 37.56231553903832, lng: 127.05876047165025 },
        { lat: 37.57038253579033, lng: 127.04794980454399 },
        { lat: 37.572878529071055, lng: 127.04263554582458 },
        { lat: 37.57302061077518, lng: 127.0381755492195 },
        { lat: 37.56978273516453, lng: 127.03099733100001 },
        { lat: 37.57190723475508, lng: 127.02337770475695 },
        { lat: 37.57838361223621, lng: 127.0232348231103 },
        { lat: 37.58268174514337, lng: 127.02953994610249 },
        { lat: 37.58894739851823, lng: 127.03553876830637 },
        { lat: 37.5911852565689, lng: 127.03621919708065 },
        { lat: 37.59126734230753, lng: 127.03875553445558 },
        { lat: 37.5956815721534, lng: 127.04062845365279 },
        { lat: 37.5969637344377, lng: 127.04302522879048 },
        { lat: 37.59617641777492, lng: 127.04734129391157 },
        { lat: 37.60117358544485, lng: 127.05101351973708 },
        { lat: 37.600149587503246, lng: 127.05209540476308 },
        { lat: 37.60132672748398, lng: 127.05508130598699 },
        { lat: 37.6010580545608, lng: 127.05917142337097 },
        { lat: 37.605121767227374, lng: 127.06219611364686 },
        { lat: 37.607062869017085, lng: 127.07111288773496 },
      ],
    },
    {
      name: "성북구",
      isMouseover: false,
      path: [
        { lat: 37.63654916557213, lng: 126.98446028560235 },
        { lat: 37.631446839436855, lng: 126.99372381657889 },
        { lat: 37.626192451322005, lng: 126.99927047335905 },
        { lat: 37.62382095469671, lng: 127.00488450145781 },
        { lat: 37.624026217174986, lng: 127.00788862747375 },
        { lat: 37.6205124078061, lng: 127.00724034082933 },
        { lat: 37.61679651952433, lng: 127.01014412786792 },
        { lat: 37.61472018601129, lng: 127.01451127202589 },
        { lat: 37.614629670135216, lng: 127.01757841621624 },
        { lat: 37.61137091590441, lng: 127.02219857751122 },
        { lat: 37.612692696824915, lng: 127.02642583551054 },
        { lat: 37.612367438936786, lng: 127.03018593770908 },
        { lat: 37.60896889076571, lng: 127.0302525167858 },
        { lat: 37.61279787695882, lng: 127.03730791358603 },
        { lat: 37.62426467261789, lng: 127.04973339977498 },
        { lat: 37.61449950127667, lng: 127.06174181124696 },
        { lat: 37.61561580859776, lng: 127.06985247014711 },
        { lat: 37.61351359068103, lng: 127.07170798866412 },
        { lat: 37.60762512162974, lng: 127.07105453180604 },
        { lat: 37.605121767227374, lng: 127.06219611364686 },
        { lat: 37.6010580545608, lng: 127.05917142337097 },
        { lat: 37.60132672748398, lng: 127.05508130598699 },
        { lat: 37.600149587503246, lng: 127.05209540476308 },
        { lat: 37.60117358544485, lng: 127.05101351973708 },
        { lat: 37.59617641777492, lng: 127.04734129391157 },
        { lat: 37.59644879095525, lng: 127.04184728392097 },
        { lat: 37.59126734230753, lng: 127.03875553445558 },
        { lat: 37.5911852565689, lng: 127.03621919708065 },
        { lat: 37.58894739851823, lng: 127.03553876830637 },
        { lat: 37.58268174514337, lng: 127.02953994610249 },
        { lat: 37.57782865303167, lng: 127.02296295333255 },
        { lat: 37.57889204835333, lng: 127.02179043639809 },
        { lat: 37.57758802896556, lng: 127.01812215416163 },
        { lat: 37.581693162424465, lng: 127.01673289259993 },
        { lat: 37.582338528091164, lng: 127.01483104096094 },
        { lat: 37.58025588757531, lng: 127.01058748333907 },
        { lat: 37.58047228501006, lng: 127.00863575242668 },
        { lat: 37.58235007703611, lng: 127.00677925856456 },
        { lat: 37.586091007146834, lng: 127.00667090686603 },
        { lat: 37.58922302426079, lng: 127.00228260552726 },
        { lat: 37.592300831997434, lng: 127.0009511248032 },
        { lat: 37.59126960661375, lng: 126.98919808879788 },
        { lat: 37.59447673441787, lng: 126.98544283754865 },
        { lat: 37.59790270809407, lng: 126.97672287261275 },
        { lat: 37.60099164566844, lng: 126.97852019816328 },
        { lat: 37.60451393107786, lng: 126.98678626394351 },
        { lat: 37.611364924201304, lng: 126.98565700183143 },
        { lat: 37.613985109550605, lng: 126.98658977758268 },
        { lat: 37.6177725051378, lng: 126.9837302191854 },
        { lat: 37.6211493968146, lng: 126.98365245774505 },
        { lat: 37.626378096236195, lng: 126.97960492198952 },
        { lat: 37.6285585388996, lng: 126.97992605309885 },
        { lat: 37.62980449548538, lng: 126.97468284124939 },
        { lat: 37.633657663246694, lng: 126.97740053878216 },
        { lat: 37.63476479485093, lng: 126.98154674721893 },
        { lat: 37.63780700422825, lng: 126.9849494717052 },
        { lat: 37.63654916557213, lng: 126.98446028560235 },
      ],
    },
    {
      name: "성동구",
      isMouseover: false,
      path: [
        { lat: 37.57275246810175, lng: 127.04241813085706 },
        { lat: 37.57038253579033, lng: 127.04794980454399 },
        { lat: 37.56231553903832, lng: 127.05876047165025 },
        { lat: 37.5594131360664, lng: 127.07373408220053 },
        { lat: 37.52832388381049, lng: 127.05621773388143 },
        { lat: 37.53423885672233, lng: 127.04604398310076 },
        { lat: 37.53582328355087, lng: 127.03979942567628 },
        { lat: 37.53581367627865, lng: 127.0211714455564 },
        { lat: 37.53378887274516, lng: 127.01719284893274 },
        { lat: 37.537681185520256, lng: 127.01726163044557 },
        { lat: 37.53938672166098, lng: 127.00993448922989 },
        { lat: 37.54157804358092, lng: 127.00879872996808 },
        { lat: 37.54502351209897, lng: 127.00815187343248 },
        { lat: 37.547466935106435, lng: 127.00931996404753 },
        { lat: 37.55264513061776, lng: 127.01620129137214 },
        { lat: 37.556850715898484, lng: 127.01807638779917 },
        { lat: 37.55779412537163, lng: 127.0228934248264 },
        { lat: 37.5607276739534, lng: 127.02339232029838 },
        { lat: 37.563390358462826, lng: 127.02652159646888 },
        { lat: 37.56505173515675, lng: 127.02678930885806 },
        { lat: 37.565200182350495, lng: 127.02358387477513 },
        { lat: 37.57190723475508, lng: 127.02337770475695 },
        { lat: 37.56978273516453, lng: 127.03099733100001 },
        { lat: 37.57302061077518, lng: 127.0381755492195 },
        { lat: 37.57275246810175, lng: 127.04241813085706 },
      ],
    },
    {
      name: "마포구",
      isMouseover: false,
      path: [
        { lat: 37.584651324803644, lng: 126.88883849288884 },
        { lat: 37.57082994377989, lng: 126.9098094620638 },
        { lat: 37.56510367293256, lng: 126.92601582346325 },
        { lat: 37.5633319104926, lng: 126.92828128083327 },
        { lat: 37.55884751347576, lng: 126.92659242918415 },
        { lat: 37.55675317809392, lng: 126.93190919632814 },
        { lat: 37.555098093384, lng: 126.93685861757348 },
        { lat: 37.55654562007193, lng: 126.9413708153468 },
        { lat: 37.557241466445234, lng: 126.95913438471307 },
        { lat: 37.55908394430372, lng: 126.96163689468189 },
        { lat: 37.55820141918588, lng: 126.96305432966605 },
        { lat: 37.554784413504734, lng: 126.9617251098019 },
        { lat: 37.548791603525764, lng: 126.96371984820232 },
        { lat: 37.54546318600178, lng: 126.95790512689311 },
        { lat: 37.54231338779177, lng: 126.95817394011969 },
        { lat: 37.539468942052544, lng: 126.955731506394 },
        { lat: 37.536292068277106, lng: 126.95128907260018 },
        { lat: 37.53569162926515, lng: 126.94627494388307 },
        { lat: 37.53377712226906, lng: 126.94458373402794 },
        { lat: 37.54135238063506, lng: 126.93031191951576 },
        { lat: 37.539036674424615, lng: 126.9271006565075 },
        { lat: 37.54143034750605, lng: 126.9224138272872 },
        { lat: 37.54141748538761, lng: 126.90483000187002 },
        { lat: 37.548015078285694, lng: 126.89890097452322 },
        { lat: 37.56300401736817, lng: 126.86623824787709 },
        { lat: 37.57178997971358, lng: 126.85363039091744 },
        { lat: 37.57379738998644, lng: 126.85362646212587 },
        { lat: 37.57747251471329, lng: 126.864939928088 },
        { lat: 37.5781913017327, lng: 126.87625939970273 },
        { lat: 37.57977132158497, lng: 126.87767870371688 },
        { lat: 37.584440882833654, lng: 126.87653889183002 },
        { lat: 37.59079311146897, lng: 126.88205386700724 },
        { lat: 37.584651324803644, lng: 126.88883849288884 },
      ],
    },
  ]);

  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [clickedArea, setClickedArea] = useState();
  return (
    <MDBox>
      <MDInput
        type="text"
        value={keyword}
        onChange={changeHandler}
        variant="outlined"
        label="type here"
      />
      <MDButton onClick={clickHandler} variant="outlined" color="info">
        Search
      </MDButton>
      <hr />
      <>
        {/* <AddPolygonMouseEvent2Style /> */}
        <Map // 로드뷰를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "450px",
          }}
          level={8} // 지도의 확대 레벨
          onMouseMove={(_map, mouseEvent) =>
            setMousePosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            })
          }
          onCreate={setMap}
        >
          {areas.map((area, index) => (
            <Polygon
              key={`area-${area.name}`}
              path={area.path}
              strokeWeight={2}
              strokeColor="#004c80"
              strokeOpacity={0.8}
              fillColor={area.isMouseover ? "#09f" : "#fff"}
              fillOpacity={0.7}
              onMouseover={() =>
                setAreas((prev) => [
                  ...prev.filter((_, i) => i !== index),
                  {
                    ...prev[index],
                    isMouseover: true,
                  },
                ])
              }
              onMouseout={() =>
                setAreas((prev) => [
                  ...prev.filter((_, i) => i !== index),
                  {
                    ...prev[index],
                    isMouseover: false,
                  },
                ])
              }
              onClick={(polygon, mouseEvent) =>
                setClickedArea({
                  position: {
                    lat: mouseEvent.latLng.getLat(),
                    lng: mouseEvent.latLng.getLng(),
                  },
                  area: Math.floor(polygon.getArea()),
                  name: area.name,
                })
              }
            />
          ))}
          {areas.findIndex((v) => v.isMouseover) !== -1 && (
            <CustomOverlayMap position={mousePosition}>
              <div className="area">{areas.find((v) => v.isMouseover).name}</div>
            </CustomOverlayMap>
          )}
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#000" }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
          {clickedArea && (
            <MapInfoWindow position={clickedArea.position}>
              <img
                alt="close"
                width="14"
                height="13"
                src="http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setClickedArea(null)}
              />
              <div className="info">
                <div className="title">{clickedArea.name}</div>
              </div>
            </MapInfoWindow>
          )}
        </Map>
      </>
    </MDBox>
  );
}

export default RebuildMap;
