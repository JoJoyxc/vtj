import type { App } from 'vue';
import {
  View,
  ScrollView,
  Swiper,
  MovableArea,
  MovableView,
  CoverView,
  CoverImage,
  Icon,
  Text,
  RichText,
  Progress,
  Button,
  CheckboxGroup,
  Checkbox,
  Editor,
  Form,
  Input,
  Label,
  Picker,
  PickerView,
  RadioGroup,
  Radio,
  Slider,
  Switch,
  Textarea,
  Navigator,
  Image,
  Video,
  Map,
  Canvas,
  WebView,
  PickerViewColumn,
  ResizeSensor,
  SwiperItem
  //@ts-ignore
} from '@dcloudio/uni-h5';

import { toKebabCase } from '../utils';

const components = {
  View,
  ScrollView,
  Swiper,
  MovableArea,
  MovableView,
  CoverView,
  CoverImage,
  Icon,
  Text,
  RichText,
  Progress,
  Button,
  CheckboxGroup,
  Checkbox,
  Editor,
  Form,
  Input,
  Label,
  Picker,
  PickerView,
  RadioGroup,
  Radio,
  Slider,
  Switch,
  Textarea,
  Navigator,
  Image,
  Video,
  Map,
  Canvas,
  WebView,
  PickerViewColumn,
  ResizeSensor,
  SwiperItem
};

export { View, ScrollView };

export function install(app: App) {
  Object.entries(components).forEach(([k, v]) => {
    app.component(k, v);
    app.component(toKebabCase(k), v);
  });
}
