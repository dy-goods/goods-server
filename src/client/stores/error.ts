import { observable, action } from 'mobx';

export default class ErrorStore {
  @observable error: Error | null = null;

  @action
  setError(error: Error | null) {
    this.error = error;
  }
  @action
  resetError() {
    this.error = null;
  }
}
