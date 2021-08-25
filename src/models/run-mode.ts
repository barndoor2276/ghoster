export const enum RUN_MODE {
  /**
   * App will clone new endpoints and return cloned data when available
   */
  LEARN = "learn",

  /**
   * App will only proxy requests and not return or record cloned data
   */
  PROXY = "proxy",

  /**
   * App will not proxy any requests and only returned available cloned data
   */
  MIRROR = "mirror",
}
