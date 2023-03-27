import json
from django.test import TestCase, Client
from .models import Module;

class POSTAPITestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_post_api(self):
        data = {'code': 'CSC4101','nom': 'Programmation Orientée Sécurité', 'seances': None, 'cours': None, 'nb_heures_total': 30, 'nb_heures_tp': 10,'nb_heures_be':10,'nb_heures_ci':10}
        response = self.client.post('/api/modules/', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Module.objects.count(), 1)
        self.assertEqual(Module.objects.get().nom, 'Programmation Orientée Sécurité')
