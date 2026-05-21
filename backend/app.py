import os
from flask import Flask, jsonify, request, redirect
from flask_migrate import Migrate
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, User, People, Planet, Vehicle, Favorite

app = Flask(__name__)
app.config['SECRET_KEY'] = 'una_llave_muy_secreta_y_larga'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración mejorada de CORS
CORS(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)
migrate = Migrate(app, db)

# Admin
admin = Admin(app, name='StarWars Admin', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(People, db.session))
admin.add_view(ModelView(Planet, db.session))
admin.add_view(ModelView(Vehicle, db.session))
admin.add_view(ModelView(Favorite, db.session))

# --- ENDPOINTS ---

@app.route('/')
def home():
    return redirect('/admin')

# GETs
@app.route('/people', methods=['GET'])
def get_people():
    return jsonify([p.serialize() for p in People.query.all()]), 200

@app.route('/planets', methods=['GET'])
def get_planets():
    return jsonify([p.serialize() for p in Planet.query.all()]), 200

@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    return jsonify([v.serialize() for v in Vehicle.query.all()]), 200

@app.route('/users/favorites', methods=['GET'])
def get_favorites():
    favs = Favorite.query.filter_by(user_id=1).all()
    results = []
    for f in favs:
        data = f.serialize() # Esto trae {people_id: 1, etc}
        # Inyectamos el nombre aquí mismo
        if f.people_id:
            p = People.query.get(f.people_id)
            data["name"] = p.name if p else "Personaje"
        elif f.planet_id:
            p = Planet.query.get(f.planet_id)
            data["name"] = p.name if p else "Planeta"
        elif f.vehicle_id:
            p = Vehicle.query.get(f.vehicle_id)
            data["name"] = p.name if p else "Vehículo"
        results.append(data)
    return jsonify(results), 200

# POSTs
@app.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_fav_planet(planet_id):
    db.session.add(Favorite(user_id=1, planet_id=planet_id))
    db.session.commit()
    return jsonify({"msg": "Planeta añadido"}), 201

@app.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_fav_people(people_id):
    db.session.add(Favorite(user_id=1, people_id=people_id))
    db.session.commit()
    return jsonify({"msg": "Personaje añadido"}), 201

@app.route('/favorite/vehicle/<int:vehicle_id>', methods=['POST'])
def add_fav_vehicle(vehicle_id):
    db.session.add(Favorite(user_id=1, vehicle_id=vehicle_id))
    db.session.commit()
    return jsonify({"msg": "Vehículo añadido"}), 201

# DELETEs
@app.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def del_fav_planet(planet_id):
    f = Favorite.query.filter_by(user_id=1, planet_id=planet_id).first()
    if not f: return jsonify({"msg": "No encontrado"}), 404
    db.session.delete(f)
    db.session.commit()
    return jsonify({"msg": "Planeta eliminado"}), 200

@app.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def del_fav_people(people_id):
    f = Favorite.query.filter_by(user_id=1, people_id=people_id).first()
    if not f: return jsonify({"msg": "No encontrado"}), 404
    db.session.delete(f)
    db.session.commit()
    return jsonify({"msg": "Personaje eliminado"}), 200

@app.route('/favorite/vehicle/<int:vehicle_id>', methods=['DELETE'])
def del_fav_vehicle(vehicle_id):
    f = Favorite.query.filter_by(user_id=1, vehicle_id=vehicle_id).first()
    if not f: return jsonify({"msg": "No encontrado"}), 404
    db.session.delete(f)
    db.session.commit()
    return jsonify({"msg": "Vehículo eliminado"}), 200

if __name__ == '__main__':
    app.run(port=3001)