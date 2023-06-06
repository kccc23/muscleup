import os
import pymongo


client = pymongo.MongoClient("mongodb://root:password@mongo")


class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
