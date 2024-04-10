import type { PropType } from 'vue';
import type { ComponentPropsType } from '../shared';
import type {
  QRCodeErrorCorrectionLevel,
  QRCodeMaskPattern,
  QRCodeToDataURLOptions,
  QRCodeToDataURLOptionsJpegWebp,
  QRCodeToSJISFunc
} from 'qrcode';

export const LEVELS = [
  'low',
  'medium',
  'quartile',
  'high',
  'L',
  'M',
  'Q',
  'H'
] as const;

export const MASK_PATTERNS = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export const MODES = ['alphanumeric', 'numeric', 'kanji', 'byte'] as const;

export type { QRCodeSegment } from 'qrcode';

export type QRCodeValue = string | (() => Promise<string>);

export const TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const;

export type QRCodeProps = Omit<QRCodeToDataURLOptions, 'renderOptions'> &
  QRCodeToDataURLOptionsJpegWebp['rendererOpts'] & {
    value: QRCodeValue;
  };

const MAX_QR_VERSION = 40;

export const qrcodeProps = {
  /**
   * 版本 version
   */
  version: {
    type: Number,
    validator: (version: number) =>
      version === Number.parseInt(String(version), 10) &&
      version >= 1 &&
      version <= MAX_QR_VERSION
  },
  /**
   * 错误收集水平  errorCorrectionLevel
   */
  errorCorrectionLevel: {
    type: String as PropType<QRCodeErrorCorrectionLevel>,
    validator: (level: QRCodeErrorCorrectionLevel) => LEVELS.includes(level),
    default: 'M'
  },
  /**
   * 面罩模式   maskPattern
   */
  maskPattern: {
    type: Number as PropType<QRCodeMaskPattern>,
    validator: (maskPattern: QRCodeMaskPattern) =>
      MASK_PATTERNS.includes(maskPattern)
  },
  toSJISFunc: Function as PropType<QRCodeToSJISFunc>,
  /**
   * 外边距 margin
   */
  margin: {
    type: Number,
    default: 4
  },
  /**
   *  规模 scale
   */
  scale: {
    type: Number,
    default: 4
  },
  /**
   *  宽度 width
   */
  width: {
    type: Number,
    default: 400
  },
  /**
   *  颜色 color
   */
  color: {
    type: Object,
    validator: (color: QRCodeProps['color']) =>
      (['dark', 'light'] as const).every((c) =>
        ['string', 'undefined'].includes(typeof color![c])
      ),
    required: true
  },
  /**
   *  类型 type
   */
  type: {
    type: String as PropType<QRCodeProps['type']>,
    validator: (type: QRCodeProps['type']) => TYPES.includes(type!),
    required: true
  },
  // 品质 quality
  quality: {
    type: Number,
    default: 0.92
  },
  // 值 value
  value: {
    type: [String, Array] as PropType<QRCodeValue>,
    default: ''
  },
  // 超时时间  毫秒
  timeout: {
    type: Number,
    default: 0
  }
};

export type qrcodeProps = ComponentPropsType<typeof qrcodeProps>;

export type QrcodeEmits = {
  change: [dataUrl: string];
  refresh: [];
};
