import { useAppStore } from '../stores/appStore'

export const navigate = (path: string) => {
  window.history.pushState(null, '', path)
  useAppStore.getState().setCurrentRoute(path)
  window.scrollTo(0, 0)
}
