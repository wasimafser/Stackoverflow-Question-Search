from celery.decorators import task
from celery.utils.log import get_task_logger

from .models import QueryResponse

logger = get_task_logger(__name__)

@task(name='save_queryresponse')
def save_queryresponse(query, response_json):
    QueryResponse.objects.create(query=query, response=response_json)
    logger.info("Query Response Object Created")
