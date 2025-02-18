import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../../version';
import { setPackageName } from '../../shared';
// container 视图容器
import view from './view';
import scrollView from './scrollView';
import swiper from './swiper';
import matchMedia from './matchMedia';
import matchArea from './movableArea';
import movableView from './movableView';
import coverView from './coverView';
import coverImage from './coverImage';

// basic 基础内容
import icon from './icon';
import text from './text';
import richText from './richText';
import progress from './progress';

//form 表单组件
import button from './button';
import checkbox from './checkbox';
import editor from './editor';
import form from './form';
import input from './input';
import label from './label';
import picker from './picker';
import pickerView from './pickerView';
import radio from './radio';
import slider from './slider';
import Switch from './Switch';
import textarea from './textarea';

// nav
import navigator from './navigator';
import audio from './audio';
import image from './image';
import video from './video';
import map from './map';
import canvas from './canvas';

const name = '@dcloudio/uni-h5';
const components: MaterialDescription[] = [
  // container
  view,
  scrollView,
  swiper,
  matchMedia,
  matchArea,
  movableView,
  coverView,
  coverImage,
  // basic
  icon,
  text,
  richText,
  progress,
  // form
  button,
  checkbox,
  editor,
  form,
  input,
  label,
  picker,
  pickerView,
  radio,
  slider,
  Switch,
  textarea,
  //nav
  navigator,
  audio,
  image,
  video,
  map,
  canvas
].flat();

const categories: MaterialCategory[] = [
  {
    id: 'container',
    category: '视图组件'
  },
  {
    id: 'basic',
    category: '基础内容'
  },
  {
    id: 'form',
    category: '表单'
  },
  {
    id: 'nav',
    category: '路由与页面跳转'
  },
  {
    id: 'media',
    category: '媒体'
  }
];

const material: Material = {
  name,
  version,
  label: 'UniApp',
  library: 'UniH5Material',
  order: 4,
  categories,
  components: setPackageName(components, name)
};

export default material;
