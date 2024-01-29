export type LoggerLevel = 'debug' | 'log' | 'info' | 'warn' | 'error';

interface Options {
  level?: LoggerLevel;
  bizName?: string;
}

const levels = { debug: -1, log: 0, info: 0, warn: 1, error: 2 };

const record = function (
  logLevel: LoggerLevel,
  targetLevel: LoggerLevel,
  bizName: string,
  targetBizName: string
) {
  return function (...args: any[]) {
    if (targetLevel && levels[targetLevel] <= levels[logLevel]) {
      // IE9 下没有 apply 函数
      if (
        // @ts-ignore
        console[logLevel].apply &&
        (targetBizName === '*' || bizName.startsWith(targetBizName))
      ) {
        return console[logLevel].apply(console, getLogArgs(args, bizName));
      }
    }
  };
};

function getLogArgs(args: any[], bizName: string) {
  if (bizName !== '*') {
    if (typeof args[0] === 'string') {
      args[0] = `[${bizName}] ${args[0]}`;
    } else {
      args = ['[' + bizName + ']'].concat(args);
    }
  }
  return args;
}

function parseLogConf(
  logConf: any,
  options: Options
): { targetLevel: string; targetBizName: string } {
  if (!logConf) {
    return {
      targetLevel: options.level as string,
      targetBizName: options.bizName as string
    };
  }
  if (~logConf.indexOf(':')) {
    const pair = logConf.split(':');
    return {
      targetLevel: pair[0],
      targetBizName: pair[1]
    };
  }
  return {
    targetLevel: logConf,
    targetBizName: '*'
  };
}

const defaultOptions: Options = {
  level: 'warn',
  bizName: '*'
};

class Logger {
  constructor(options: Options) {
    options = { ...defaultOptions, ...options };
    const _location = typeof location !== 'undefined' ? location : ({} as any);
    // __logConf__ 格式为 logLevel[:bizName]
    //   1. log|warn|debug|error
    //   2. log|warn|debug|error:*
    //   3. log|warn|debug|error:bizName
    const logConf = (/__(?:logConf|logLevel)__=([^#/&]*)/.exec(
      _location.href
    ) || [])[1];
    const { targetLevel, targetBizName } = parseLogConf(logConf, options);

    for (const logLevel in levels) {
      (this as any)[logLevel] = record(
        logLevel as LoggerLevel,
        targetLevel as LoggerLevel,
        options.bizName as string,
        targetBizName as string
      );
    }
  }
}

export function getLogger(config: {
  level: LoggerLevel;
  bizName: string;
}): Logger {
  return new Logger(config);
}
const logger = getLogger({ level: 'log', bizName: 'VTJ' });

export { Logger, logger };
