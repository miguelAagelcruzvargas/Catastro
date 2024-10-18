from flask import Flask, render_template, request, jsonify
from db import get_db
from bson import ObjectId

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

#____________________________________________ ADMIN _____________________________________________________________
@app.route('/admin')
def admin():
    return render_template('admin.html')

############################## EMPLEADOS ##########################################

@app.route('/empleados')
def empleados():
    db = get_db()
    empleados = db.empleados.find()  # Consulta a la colección "empleados"
    return render_template('empleados.html', empleados=empleados)

@app.route('/add_empleado', methods=['POST'])
def add_empleado():
    db = get_db()
    data = request.get_json()
    nuevo_empleado = {
        'rfc': data['rfc'],
        'nombre': data['nombre'],
        'ape_paterno': data['ape_paterno'],
        'ape_materno': data['ape_materno'],
        'caja': int(data['caja'])
    }
    result = db.empleados.insert_one(nuevo_empleado)
    return jsonify({'_id': str(result.inserted_id)}), 201

@app.route('/delete_empleado/<string:id>', methods=['DELETE'])
def delete_empleado(id):
    db = get_db()
    db.empleados.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Empleado eliminado'}), 200

@app.route('/update_empleado/<string:id>', methods=['PUT'])
def update_empleado(id):
    db = get_db()
    data = request.get_json()
    db.empleados.update_one(
        {'_id': ObjectId(id)},
        {'$set': {
            'rfc': data['rfc'],
            'nombre': data['nombre'],
            'ape_paterno': data['ape_paterno'],
            'ape_materno': data['ape_materno'],
            'caja': int(data['caja'])
        }}
    )
    return jsonify({'message': 'Empleado actualizado'}), 200

############################## CONTRIBUYENTES ##########################################

@app.route('/contribuyentes')
def contribuyentes():
    db = get_db()
    contribuyentes = db.contribuyentes.find()
    return render_template('contribuyentes.html', contribuyentes=contribuyentes)

@app.route('/add_contribuyente', methods=['POST'])
def add_contribuyente():
    db = get_db()
    data = request.get_json()
    nuevo_contribuyente = {
        'nombre': data['nombre'],
        'ape_paterno': data['ape_paterno'],
        'ape_materno': data['ape_materno'],
        'domicilio': data['domicilio'],
        'rfc': data['rfc'],
        'localidad': data['localidad'],
        'cp': data['cp']
    }
    result = db.contribuyentes.insert_one(nuevo_contribuyente)
    return jsonify({'_id': str(result.inserted_id)}), 201

@app.route('/delete_contribuyente/<string:id>', methods=['DELETE'])
def delete_contribuyente(id):
    db = get_db()
    db.contribuyentes.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Contribuyente eliminado'}), 200

@app.route('/update_contribuyente/<string:id>', methods=['PUT'])
def update_contribuyente(id):
    db = get_db()
    data = request.get_json()
    db.contribuyentes.update_one(
        {'_id': ObjectId(id)},
        {'$set': {
            'nombre': data['nombre'],
            'ape_paterno': data['ape_paterno'],
            'ape_materno': data['ape_materno'],
            'domicilio': data['domicilio'],
            'rfc': data['rfc'],
            'localidad': data['localidad'],
            'cp': data['cp']
        }}
    )
    return jsonify({'message': 'Contribuyente actualizado'}), 200

############################ PREDIOS ####################################

@app.route('/predios')
def predios():
    db = get_db()
    predios = db.contribuyentes.find()  # Usamos los contribuyentes para obtener los predios
    return render_template('predios.html', predios=predios)

@app.route('/add_predio', methods=['POST'])
def add_predio():
    db = get_db()
    data = request.get_json()
    nuevo_predio = {
        'rfc': data['rfc'],
        'clave_catastral': data['clave_catastral'],
        'padron': data['padron'],
        'cuenta_catastral': data['cuenta_catastral'],
        'ubicacion_predio': data['ubicacion_predio'],
        'cp_predio': data['cp_predio'],
        'base_gravable': data['base_gravable'],
        'superficie_contruccion': data['superficie_contruccion'],
        'superficie_terreno': data['superficie_terreno'],
        'fecha_celebracion': data['fecha_celebracion']
    }
    db.predios.insert_one(nuevo_predio)
    return jsonify({'message': 'Predio agregado'}), 201

@app.route('/ver_predios/<string:rfc>')
def ver_predios(rfc):
    db = get_db()
    predios = db.predios.find({'rfc': rfc})
    return render_template('ver_predio.html', predios=predios, rfc=rfc)

@app.route('/delete_predio/<string:id>', methods=['DELETE'])
def delete_predio(id):
    db = get_db()
    db.predios.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Predio eliminado'}), 200

@app.route('/editar_predio/<string:id>')
def editar_predio(id):
    db = get_db()
    predio = db.predios.find_one({'_id': ObjectId(id)})
    return render_template('editar_predio.html', predio=predio)

@app.route('/update_predio/<string:id>', methods=['PUT'])
def update_predio(id):
    db = get_db()
    data = request.get_json()
    db.predios.update_one(
        {'_id': ObjectId(id)},
        {'$set': {
            'rfc': data['rfc'],
            'clave_catastral': data['clave_catastral'],
            'padron': data['padron'],
            'cuenta_catastral': data['cuenta_catastral'],
            'ubicacion_predio': data['ubicacion_predio'],
            'cp_predio': data['cp_predio'],
            'base_gravable': data['base_gravable'],
            'superficie_contruccion': data['superficie_contruccion'],
            'superficie_terreno': data['superficie_terreno'],
            'fecha_celebracion': data['fecha_celebracion']
        }}
    )
    return jsonify({'message': 'Predio actualizado'}), 200


if __name__ == '__main__':
    app.run(debug=True)
