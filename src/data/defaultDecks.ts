import { SlideDeck } from '../types/slideshow';

export const DEFAULT_DECKS: SlideDeck[] = [
  {
    id: 'volcano-exp',
    title: '🧪 오늘 우리가 한 실험: 베이킹소다 화산 폭발',
    subject: '화학 탐구',
    date: '2026. 10. 07',
    slides: [
      {
        id: 'v1',
        title: '오늘 우리가 한 실험: 화산 분출 시뮬레이션',
        subtitle: '산과 염기의 중화 반응 및 이산화탄소 기체 발생 탐구',
        stepTag: '1단계: 탐구 주제 및 가설',
        teamName: '3모둠 (김민준, 박서연, 이도현, 정예린)',
        notes: '가설: 염기성인 탄산수소나트륨(베이킹소다)에 산성인 식초(아세트산)를 넣으면 급격한 화학 반응이 일어나 다량의 거품과 기체가 발생하여 화산 분출 모양을 재현할 것이다.',
        materials: ['탄산수소나트륨(베이킹소다) 30g', '식초(5% 아세트산) 100mL', '빨간색 식용색소', '주방세제 2방울', '삼각 플라스크', '실험용 트레이'],
        keyFindings: ['반응 전 온도: 21.2°C', '예상 발생 기체: CO₂'],
        imageUrl: '/src/assets/images/volcano_reaction_1791353713051.jpg',
        imageCaption: '플라스크에서 부글거리며 뿜어져 나오는 붉은 거품 마그마',
        duration: 6,
        layout: 'fullscreen'
      },
      {
        id: 'v2',
        title: '실험 도구 및 재료 세팅',
        subtitle: '안전 장갑 착용 및 정확한 용량 계량',
        stepTag: '2단계: 준비 및 과정',
        teamName: '3모둠 (김민준, 박서연)',
        notes: '1. 삼각플라스크 바닥에 베이킹소다 30g을 전자저울로 정밀 측정하여 넣는다.\n2. 붉은색 식용색소 3방울과 세제 2방울을 첨가한다. (세제는 거품을 오래 지속시키는 계면활성제 역할)\n3. 식초 100mL를 비커에 준비하고 안전 고글을 착용한다.',
        materials: ['전자저울', '약수저', '눈금실린더', '비커', '보안경'],
        keyFindings: ['세제 첨가 시 기포막 안정성 3배 증가'],
        imageUrl: '/src/assets/images/volcano_reaction_1791353713051.jpg',
        imageCaption: '실험대 위에 정돈된 시약과 측정 기구',
        duration: 5,
        layout: 'split-right'
      },
      {
        id: 'v3',
        title: '순식간에 솟구치는 붉은 거품 용암 관찰',
        subtitle: '식초를 붓는 순간 격렬한 기포 발생과 부피 팽창',
        stepTag: '3단계: 관찰 및 반응 측정',
        teamName: '3모둠 (이도현, 정예린)',
        notes: '식초를 플라스크에 붓자마자 "치이익"하는 소리와 함께 0.8초 만에 플라스크 입구를 넘어 트레이로 붉은 거품이 용암처럼 흘러내렸습니다. 비커 바닥을 만져보니 온도가 미세하게 내려가는 흡열 경향이 관찰되었습니다.',
        keyFindings: ['반응 시작: 0.8초 이내', '거품 분출 최고 높이: 플라스크 위 12cm', '반응 후 온도: 19.8°C (흡열 반응)'],
        imageUrl: '/src/assets/images/volcano_reaction_1791353713051.jpg',
        imageCaption: '폭발적으로 솟구치는 거품의 역동적 순간 포착',
        duration: 6,
        layout: 'split-left'
      },
      {
        id: 'v4',
        title: '실험 결론: 화학 반응식과 과학 원리',
        subtitle: 'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑',
        stepTag: '4단계: 결론 및 핵심 원리',
        teamName: '3모둠 전체',
        notes: '탄산수소나트륨과 아세트산이 반응하여 아세트산나트륨, 물, 그리고 이산화탄소(CO₂) 기체가 생성되었습니다. 이 기체가 세제 성분과 만나 가벼운 기포를 형성하며 부피가 10배 이상 팽창하여 화산 폭발의 마그마 분출과 유사한 원리를 실증했습니다.',
        keyFindings: ['가설 검증 완료: 100% 일치', '발생 기체 확인: 석회수에 통과 시 뿌옇게 흐려짐 확인'],
        imageUrl: '/src/assets/images/volcano_reaction_1791353713051.jpg',
        imageCaption: '반응 종료 후 안정화된 상태의 생성물',
        duration: 7,
        layout: 'card'
      }
    ]
  },
  {
    id: 'cell-microscope',
    title: '🔬 양파 표피세포 현미경 관찰',
    subject: '생명과학',
    date: '2026. 10. 07',
    slides: [
      {
        id: 'c1',
        title: '식물 세포 프레파라트 만들기',
        subtitle: '양파 안쪽 비늘잎 표피를 핀셋으로 얇게 벗겨내기',
        stepTag: '1단계: 표본 제작',
        teamName: '생명탐구 1반',
        notes: '양파 표피는 한 겹의 얇은 단층 세포로 이루어져 있어 빛이 투과하기 좋습니다. 받침유리 위에 물 한 방울을 떨어뜨리고 표피를 겹치지 않게 잘 편 뒤 덮개유리를 45도 각도로 조심스럽게 덮어 기포가 생기지 않도록 했습니다.',
        materials: ['양파', '광학 현미경', '받침유리 및 덮개유리', '핀셋', '면도칼', '거름종이'],
        keyFindings: ['기포 없이 완벽한 단일층 프레파라트 완성'],
        imageUrl: '/src/assets/images/onion_cell_microscope_1791353728917.jpg',
        imageCaption: '현미경 아래에서 규칙적인 벽돌 배열을 보이는 세포들',
        duration: 5,
        layout: 'split-left'
      },
      {
        id: 'c2',
        title: '아세트산카민 용액 염색과 핵 관찰',
        subtitle: '붉은색 염색약이 음전하를 띤 핵산에 결합',
        stepTag: '2단계: 염색 및 100배율 관찰',
        teamName: '생명탐구 1반',
        notes: '덮개유리 한쪽에 아세트산카민 용액을 한 방울 떨어뜨리고 반대편에서 거름종이로 흡수시켜 세포 전체에 염색약을 고르게 퍼뜨렸습니다. 100배율에서 세포마다 둥글고 진하게 염색된 핵이 하나씩 뚜렷하게 관찰되었습니다.',
        keyFindings: ['관찰 배율: 100배 (접안 10x × 대물 10x)', '핵의 위치: 세포 가장자리에 편재됨'],
        imageUrl: '/src/assets/images/onion_cell_microscope_1791353728917.jpg',
        imageCaption: '선명하게 염색된 세포핵과 직사각형 모양의 식물 세포벽',
        duration: 6,
        layout: 'fullscreen'
      },
      {
        id: 'c3',
        title: '400배율 고배율 상세 구조와 결론',
        subtitle: '단단한 세포벽 구조와 동물 세포와의 비교',
        stepTag: '3단계: 구조 분석 및 결론',
        teamName: '생명탐구 1반',
        notes: '400배율로 확대한 결과, 세포막 바깥을 둘러싼 두껍고 단단한 세포벽(Cell Wall) 덕분에 규칙적인 육각형/직사각형 격자 형태를 유지하고 있음을 확인했습니다. 양파는 지하 비늘줄기이므로 엽록체는 관찰되지 않았습니다.',
        keyFindings: ['세포벽 존재 확인 (모양 유지 기능)', '핵 크기: 약 5~8 μm'],
        imageUrl: '/src/assets/images/onion_cell_microscope_1791353728917.jpg',
        imageCaption: '400배율 고해상도 현미경 미세구조',
        duration: 6,
        layout: 'card'
      }
    ]
  },
  {
    id: 'ph-rainbow',
    title: '🌈 지시약의 마법: 무지개 pH 스펙트럼',
    subject: '화학 탐구',
    date: '2026. 10. 07',
    slides: [
      {
        id: 'p1',
        title: '만능 지시약과 용액의 산도(pH)',
        subtitle: '수소 이온 농도 지수(pH 1부터 14까지)에 따른 발색 변화',
        stepTag: '1단계: 탐구 배경',
        teamName: '화학 매직팀',
        notes: '우리가 일상에서 접하는 다양한 수용액(염산, 식초, 순수한 물, 베이킹소다, 락스 등)의 수소 이온 농도를 만능 지시약을 통해 직관적인 무지개 색상으로 가시화하는 실험입니다.',
        materials: ['시험관 6개 및 랙', '만능 지시약 용액', '스포이트', 'pH 표준 색상 대조표'],
        keyFindings: ['산성: 붉은색/주황색 계열', '중성: 녹색', '염기성: 파란색/보라색 계열'],
        imageUrl: '/src/assets/images/rainbow_ph_tubes_1791353742918.jpg',
        imageCaption: '나란히 놓인 시험관 속 화려한 무지개 그라데이션',
        duration: 5,
        layout: 'fullscreen'
      },
      {
        id: 'p2',
        title: '6개 시험관의 연속 스펙트럼 완성',
        subtitle: '빨간색(pH 1)부터 짙은 보라색(pH 13)까지 배열',
        stepTag: '2단계: 관찰 결과',
        teamName: '화학 매직팀',
        notes: '시험관 1(묽은 염산 - 빨강), 시험관 2(식초 - 주황), 시험관 3(탄산수 - 노랑), 시험관 4(증류수 - 초록), 시험관 5(베이킹소다수 - 파랑), 시험관 6(수산화나트륨수 - 보라) 순서로 아름다운 무지개빛 그라데이션을 성공적으로 구현했습니다.',
        keyFindings: ['순수 증류수: 정확한 pH 7.0 녹색 확인', '만능 지시약 색변화의 재현성 확인'],
        imageUrl: '/src/assets/images/rainbow_ph_tubes_1791353742918.jpg',
        imageCaption: '빛을 투과시켜 확인한 선명한 색 분광 시험관',
        duration: 6,
        layout: 'split-right'
      }
    ]
  },
  {
    id: 'water-rocket',
    title: '🚀 작용-반작용 뉴턴 제3법칙 물로켓 탐구',
    subject: '물리 탐구',
    date: '2026. 10. 07',
    slides: [
      {
        id: 'w1',
        title: '물로켓 발사와 뉴턴 운동 법칙',
        subtitle: '물이 아래로 뿜어지는 힘에 대한 반작용으로 로켓이 상승',
        stepTag: '1단계: 발사 원리 및 가설',
        teamName: '우주항공 꿈나무팀',
        notes: '가설: 압축 공기만 채웠을 때보다 밀도가 높은 물을 적정량(페트병의 약 1/3) 채웠을 때 분출 질량이 커져 더 큰 반작용 추력을 얻고 최고 고도에 도달할 것이다.',
        materials: ['1.5L 내압 페트병', '공기 주입 밸브 및 펌프', '발사대(각도 조절기)', '물 500mL', '고도 측정기'],
        keyFindings: ['최적 발사 각도: 45도', '설정 압력: 65 psi'],
        imageUrl: '/src/assets/images/water_rocket_launch_1791353758481.jpg',
        imageCaption: '운동장 푸른 하늘을 향해 거센 물줄기를 내뿜으며 발사되는 물로켓',
        duration: 6,
        layout: 'fullscreen'
      },
      {
        id: 'w2',
        title: '발사 순간의 역동적 물줄기와 최고 비행',
        subtitle: '운동량 보존 법칙: m₁v₁ = -m₂v₂',
        stepTag: '2단계: 결과 분석',
        teamName: '우주항공 꿈나무팀',
        notes: '카운트다운과 함께 방아쇠를 당기자 고압의 물이 노즐을 통해 지면을 강하게 밀어내며 물로켓이 순식간에 약 35m 상공까지 솟아올랐습니다. 고속 카메라 촬영으로 포물선 궤적과 낙하산 펼쳐짐을 기록했습니다.',
        keyFindings: ['최고 도달 고도: 34.8m', '비행 시간: 6.2초', '가설 완벽 입증'],
        imageUrl: '/src/assets/images/water_rocket_launch_1791353758481.jpg',
        imageCaption: '하늘 높이 솟아오른 로켓과 포물선 궤적',
        duration: 6,
        layout: 'photo-top'
      }
    ]
  }
];
