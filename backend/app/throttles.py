from rest_framework.throttling import AnonRateThrottle

class AnonMinThrottle(AnonRateThrottle):
    scope = 'anon_min'


class AnonDayThrottle(AnonRateThrottle):
    scope = 'anon_day'
