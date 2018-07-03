from webapp2 import Route
from webapp2_extras.routes import PathPrefixRoute

from app.backup import BackupHandler
from app.generate_codes import GenerateCodesHandler
from rest_up import ResourceRoutes

from scavenger import TwilioHandler
from app.models.story import Story
from app.models.story_code import StoryCode
from app.models.clue import Clue
from app.models.answer import Answer
from app.models.message import Message
from app.models.group import Group
from app.models.user import User

ROUTES = [
    PathPrefixRoute('/api', [
        ResourceRoutes('stories', Story),
        ResourceRoutes('codes', StoryCode),
        ResourceRoutes('clues', Clue),
        ResourceRoutes('answers', Answer),
        ResourceRoutes('groups', Group),
        ResourceRoutes('messages', Message),
        ResourceRoutes('users', User),
        Route('/codes/generate', GenerateCodesHandler),
        ResourceRoutes('messages/story/<story_uid:[^/]+>', Message, method='for_story'),
        ResourceRoutes('messages/group/<group_uid:[^/]+>', Message, method='for_group'),
        ResourceRoutes('messages/user/<user_uid:[^/]+>', Message, method='for_user'),
        ResourceRoutes('answers/story/<story_uid:[^/]+>', Answer, method='for_story')
        ]),
    PathPrefixRoute('/admin', [
        Route('/backup', BackupHandler),
        Route('/gen-codes', GenerateCodesHandler),
    ]),
    Route('/twilio', TwilioHandler),
]
