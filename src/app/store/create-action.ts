import { IActionPayload } from './index';

export function createAction<T>(type: string) {
  const actionFactory = (props: IActionPayload<T>) => ({ type, payload: props.payload });
  actionFactory.type = type;
  return actionFactory;
}
