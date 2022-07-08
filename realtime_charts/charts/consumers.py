import json
from random import randint
from asyncio import sleep
from .models import SalesByCardType

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async


class ChartsConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def get_sales_by_card_type(self):
        queryset = SalesByCardType.objects.all()

        labels = []
        sales_data = []

        for salesByCardType in queryset:
            labels.append(salesByCardType.card_type)
            sales_data.append(salesByCardType.total_sales)

        charts_data = {
            "labels": labels,
            "sales_data": sales_data
        }

        return charts_data

    async def connect(self):
        await self.accept()

        while True:
            charts_data = await self.get_sales_by_card_type()
            print("charts_data-2")
            print(charts_data)
            await self.send(json.dumps(charts_data))
            await sleep(5)
