import navaid from 'navaid';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentParams = {};
  }

  add(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  start() {
    navaid('/', this.handleRoute.bind(this));
    navaid('/:path(*)', this.handleRoute.bind(this));

    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });

    navaid.listen();
  }

  handleRoute(params) {
    const hash = window.location.hash.slice(1) || '/';
    this.currentParams = params || {};

    let handler = this.routes.get(hash);

    if (!handler) {
      for (const [path, routeHandler] of this.routes) {
        if (this.matchPath(path, hash)) {
          handler = routeHandler;
          break;
        }
      }
    }

    if (handler) {
      this.currentRoute = hash;
      handler(this.currentParams);
    } else {
      this.routes.get('/404')?.();
    }
  }

  matchPath(pattern, path) {
    if (pattern === '/') {
      return path === '/';
    }

    const patternSegments = pattern.split('/').filter(Boolean);
    const pathSegments = path.split('/').filter(Boolean);

    if (patternSegments.length !== pathSegments.length) {
      return false;
    }

    const params = {};

    for (let i = 0; i < patternSegments.length; i++) {
      const patternSegment = patternSegments[i];
      const pathSegment = pathSegments[i];

      if (patternSegment.startsWith(':')) {
        params[patternSegment.slice(1)] = pathSegment;
      } else if (patternSegment !== pathSegment) {
        return false;
      }
    }

    this.currentParams = params;
    return true;
  }

  navigate(path) {
    window.location.hash = path;
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  getCurrentParams() {
    return this.currentParams;
  }
}

export const router = new Router();