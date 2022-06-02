import isUndefined from 'lodash-es/isUndefined';
import isArray from 'lodash-es/isArray';

const executeGuards = (guards: any, to: any, from: any, next: any) => {
  const guardsLeft = guards.slice(0);
  const nextGuard = guardsLeft.shift();
  if (isUndefined(nextGuard)) {
    next();
    return;
  }
  nextGuard(to, from, (nextArg: any) => {
    if (isUndefined(nextArg)) {
      executeGuards(guardsLeft, to, from, next);
      return;
    }
    next(nextArg);
  });
};

export const ResolveGuard = (guards: any) => {
  if (!isArray(guards)) {
    throw new Error('Guards must be an array');
  }
  return (to: any, from: any, next: any) => {
    return executeGuards(guards, to, from, next);
  };
};
