# Stackoverflow-Question-Search
Application to search questions from stackoverflow using the StackOverflow API

---

#### Requirements:
* Docker
* Docker Compose
* Git

#### Installation
1. Download / clone the project.
2. Inside the project directory run `docker-compose up`.

Now navigate to http://127.0.0.1:8000.


#### Tech Stack
* Deployment :
  * Docker
* Backend :
  * Django
  * Django Rest Framework ( Rest API )
  * Celery ( Task Queue )
  * RabbitMQ ( Celery Message Broker )
  * CORS-Headers ( Fix CORS Related problems )
* Frontend :
  * React ( Complied and served with Django )
  * TailwindCSS ( CSS, via CDN )

#### What can it do ?
* Search StackOverflow with the [advanced-search](https://api.stackexchange.com/docs/advanced-search) API endpoint.
* List results with pagination support.
* Cache results.
* Throttle requests :
  * Per Min: **5**
  * Per Day: **100**
