import {Project, Listing} from '../types';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: '中建科创大厦',
    location: '上海市浦东新区陆家嘴金融城',
    totalArea: '50,000㎡',
    rentRange: '6.5-9.0 元/㎡/天',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
    ],
    tags: ['地铁房', '高档写字楼', '绿化率高'],
    listingCount: 24,
    isFavorite: false,
    subProject: '中建科创中心一期',
    managedArea: '45,000㎡',
    buildingArea: '60,000㎡',
    vacantArea: '5,000㎡',
    rentableArea: '8,000㎡',
    propertyPrice: '32 元/㎡/月',
    avgRent: '7.8 元/㎡/天',
    description: '中建科创大厦位于金融核心区，集高端办公、商业配套于一体，获得LEED金级认证。',
    coordinates: {lat: 31.2304, lng: 121.4737}
  },
  {
    id: 'p2',
    name: '建工智慧产业园',
    location: '南京市雨花台区软件大道',
    totalArea: '120,000㎡',
    rentRange: '2.5-4.5 元/㎡/天',
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000',
      'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1000'
    ],
    tags: ['公交便捷', '研发中心', '精装修'],
    listingCount: 15,
    isFavorite: true,
    subProject: '南京智慧园A区',
    managedArea: '100,000㎡',
    buildingArea: '150,000㎡',
    vacantArea: '12,000㎡',
    rentableArea: '15,000㎡',
    propertyPrice: '15 元/㎡/月',
    avgRent: '3.2 元/㎡/天',
    description: '专注于高新企业入驻的智慧园区，提供全方位孵化支持与现代办公环境。',
    coordinates: {lat: 32.0603, lng: 118.7969}
  }
];

export const mockListings: Listing[] = [
  {
    id: 'l1',
    projectId: 'p1',
    name: '中建科创大厦 18楼整层',
    location: '上海市浦东新区',
    area: '1200㎡',
    rent: '8.5 元/㎡/天',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000',
      'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1000'
    ],
    tags: ['高速电梯', '中央空调', '江景办公'],
    isFavorite: false,
    floorRoom: '18楼全层',
    type: '写字楼',
    nature: '办公',
    decoration: '豪华装修',
    propertyFee: '35 元/㎡/月',
    description: '高区整层，视野极佳，采光通透，适合总部办公。',
    agent: {
      name: '张经理',
      phone: '138-0000-0001'
    }
  },
  {
    id: 'l2',
    projectId: 'p1',
    name: '中建科创大厦 803室',
    location: '上海市浦东新区',
    area: '245㎡',
    rent: '7.2 元/㎡/天',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000'
    ],
    tags: ['高速电梯', '中央空调'],
    isFavorite: true,
    floorRoom: '8楼03室',
    type: '写字楼',
    nature: '办公',
    decoration: '标准简装',
    propertyFee: '35 元/㎡/月',
    description: '中小面积灵活空间，功能分区合理。',
    agent: {
      name: '李经理',
      phone: '139-1111-2222'
    }
  },
  {
    id: 'l3',
    projectId: 'p2',
    name: '建工智慧产业园 B2栋独立单元',
    location: '南京市雨花台区',
    area: '560㎡',
    rent: '3.8 元/㎡/天',
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec239397148?q=80&w=1000'
    ],
    tags: ['独立空调', '展示厅', '近食堂'],
    isFavorite: false,
    floorRoom: 'B2栋1-2层',
    type: '研发楼',
    nature: '研发/办公',
    decoration: '毛坯自装',
    propertyFee: '12 元/㎡/月',
    description: '独栋单元，带挑高大厅，适合大型研发团队。',
    agent: {
      name: '王主管',
      phone: '150-5555-6666'
    }
  }
];
