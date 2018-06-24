from google.appengine.ext import ndb
from app.models.group import Group
from rest_up import serialize_datetime
from uuid import uuid4

class User(ndb.Model):
    SERIALIZERS = [serialize_datetime]
    
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        if not self.key:
            self.key = ndb.Key(self.__class__, uuid4().hex)

    SERIALIZERS = [serialize_datetime]

    user_uid = ndb.ComputedProperty(lambda s: s.key.id())
    group_uid = ndb.StringProperty()
    data = ndb.JsonProperty(default={})
    registration_date = ndb.DateTimeProperty(auto_now_add=True)
    messaged_at = ndb.DateTimeProperty(auto_now_add=True)
    stopped = ndb.BooleanProperty(default=False)

    def restart(self):
        self.data = {}

    def start(self):
        self.stopped = False
        self.put()

    def stop(self):
        self.stopped = True
        self.put()

    @property
    def group(self):
        return Group.get_by_id(self.group_uid)

    @property
    def phone(self):
        return self.key.id()
