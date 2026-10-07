export interface PresetImage {
  id: string;
  title: string;
  category: '화학' | '생명과학' | '물리' | '지구과학';
  url: string;
  description: string;
}

export const PRESET_IMAGES: PresetImage[] = [
  {
    id: 'volcano',
    title: '화산 폭발 모의실험',
    category: '화학',
    url: '/src/assets/images/volcano_reaction_1791353713051.jpg',
    description: '베이킹소다와 식초 반응으로 인한 붉은 용암 분출 모의'
  },
  {
    id: 'onion_cell',
    title: '양파 표피세포 현미경',
    category: '생명과학',
    url: '/src/assets/images/onion_cell_microscope_1791353728917.jpg',
    description: '아세트산카민 염색을 통한 세포벽 및 핵 고배율 관찰'
  },
  {
    id: 'rainbow_ph',
    title: 'pH 지시약 무지개 시험관',
    category: '화학',
    url: '/src/assets/images/rainbow_ph_tubes_1791353742918.jpg',
    description: '용액의 산성과 염기성에 따른 화려한 스펙트럼 색변화'
  },
  {
    id: 'water_rocket',
    title: '작용-반작용 물로켓 발사',
    category: '물리',
    url: '/src/assets/images/water_rocket_launch_1791353758481.jpg',
    description: '공기압축과 물 분사를 통한 뉴턴의 운동 제3법칙 실증'
  }
];
