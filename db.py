from pymongo import MongoClient

def get_db():
    client = MongoClient('mongodb://localhost:27017/')  # Ajusta la URI según tu configuración de MongoDB
    db = client['Catastral']  # Nombre de la base de datos
    return db
