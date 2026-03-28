#!/usr/bin/env python3
"""
LatinMundo — API de productos
Persistencia real con SQLite. Los productos sobreviven recargas para siempre.
"""
import json
import sqlite3
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

DB_PATH = "/home/user/workspace/supermundo/products.db"

# ── Productos por defecto ──────────────────────────────────
DEFAULT_PRODUCTS = [
  {"id":1,"name":"CBSé Yerba Mate Frutos del Bosque","tags":["yerba mate","bebida","argentina","infusión"],"description":"Yerba mate argentina con aroma natural a frutos del bosque. Bolsa de 500g.","price":"","badge":"popular","emoji":"🧉","image":""},
  {"id":2,"name":"CBSé Yerba Mate Naranja","tags":["yerba mate","bebida","argentina","infusión","cítrico"],"description":"Blend de yerba mate con notas cítricas de naranja. 500g.","price":"","badge":"","emoji":"🧉","image":""},
  {"id":3,"name":"Canarias Yerba Mate","tags":["yerba mate","bebida","uruguaya","infusión"],"description":"Yerba mate uruguaya de hoja fina, clásica y reconocida en todo el mundo.","price":"","badge":"","emoji":"🧉","image":""},
  {"id":4,"name":"Kurupí Menta y Boldo","tags":["yerba mate","bebida","hierbas","infusión","digestivo"],"description":"Yerba mate compuesta con hierbas de menta y boldo. Sabor suave y digestivo. 500g.","price":"","badge":"nuevo","emoji":"🧉","image":""},
  {"id":5,"name":"Buchanan's DeLuxe 12 Años","tags":["whisky","bebida espirituosa","escocés","alcohol","premium"],"description":"Whisky escocés blended envejecido 12 años. Notas de vainilla, miel y especias. 700ml.","price":"","badge":"premium","emoji":"🥃","image":""},
  {"id":6,"name":"Old Parr Tropical","tags":["whisky","bebida espirituosa","escocés","alcohol"],"description":"Whisky escocés con vibra caribeña. Notas frescas y tropicales. 700ml.","price":"","badge":"","emoji":"🥃","image":""},
  {"id":7,"name":"Cristal Sin Azúcar","tags":["bebida espirituosa","caña","ecuador","alcohol","sin azúcar"],"description":"Bebida espirituosa de caña del Valle de Yanguilla, Ecuador. 700ml — 34% ABV.","price":"","badge":"","emoji":"🍶","image":""},
  {"id":8,"name":"Trópico Liqueur","tags":["licor","bebida espirituosa","tropical","alcohol","frutas"],"description":"Licor tropical con sabores a frutas exóticas.","price":"","badge":"","emoji":"🍹","image":""},
  {"id":9,"name":"Tilapia Fresca","tags":["pescado","fresco","proteína","mar"],"description":"Tilapia entera fresca. Ideal para freír, al horno o a la plancha.","price":"","badge":"fresco","emoji":"🐟","image":""},
  {"id":10,"name":"Maizena","tags":["despensa","harina","maíz","espesante","colombiana"],"description":"Fécula de maíz Maizena. Imprescindible en la cocina latinoamericana.","price":"","badge":"","emoji":"🌽","image":""},
  {"id":11,"name":"Arroz Blanco Largo","tags":["despensa","arroz","cereal","básico"],"description":"Arroz de grano largo, base de la cocina latinoamericana. 1kg y 5kg.","price":"","badge":"","emoji":"🍚","image":""},
  {"id":12,"name":"Frijoles Negros","tags":["despensa","legumbre","conserva","proteína","colombiana"],"description":"Frijoles negros secos. Esenciales para gallo pinto, moros y cristianos.","price":"","badge":"","emoji":"🫘","image":""},
  {"id":13,"name":"Plátano Macho","tags":["fruta","fresco","tropical","verdura","plátano"],"description":"Plátano macho importado, perfecto para tostones y patacones.","price":"","badge":"fresco","emoji":"🍌","image":""},
  {"id":14,"name":"Yuca Fresca","tags":["verdura","fresco","tropical","raíz","mandioca"],"description":"Yuca fresca (mandioca). Ideal para hervir, freír o hacer purés.","price":"","badge":"fresco","emoji":"🌿","image":""},
  {"id":15,"name":"Ají Amarillo","tags":["especias","condimento","picante","peruano","fresco"],"description":"Ají amarillo peruano. Sabor único, afrutado y picante moderado.","price":"","badge":"","emoji":"🌶️","image":""},
  {"id":16,"name":"Tinto de Verano Tropical","tags":["refresco","bebida","lata","verano"],"description":"Refresco de tinto de verano con toque tropical. Pack de 6 latas.","price":"","badge":"","emoji":"🥤","image":""}
]

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            tags TEXT DEFAULT '[]',
            description TEXT DEFAULT '',
            price TEXT DEFAULT '',
            badge TEXT DEFAULT '',
            emoji TEXT DEFAULT '🛒',
            image TEXT DEFAULT '',
            sort_order INTEGER DEFAULT 0
        )
    """)
    db.commit()
    # Si la tabla está vacía, insertar los productos por defecto
    count = db.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    if count == 0:
        for p in DEFAULT_PRODUCTS:
            db.execute(
                "INSERT INTO products (id, name, tags, description, price, badge, emoji, image, sort_order) VALUES (?,?,?,?,?,?,?,?,?)",
                [p["id"], p["name"], json.dumps(p["tags"]), p["description"], p["price"], p["badge"], p["emoji"], p["image"], p["id"]]
            )
        db.execute("UPDATE sqlite_sequence SET seq = ? WHERE name = 'products'", [len(DEFAULT_PRODUCTS)])
        db.commit()
    db.close()

def row_to_dict(row):
    d = dict(row)
    d["tags"] = json.loads(d.get("tags") or "[]")
    d.pop("sort_order", None)
    return d

@asynccontextmanager
async def lifespan(app):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ProductIn(BaseModel):
    name: str
    tags: List[str] = []
    description: str = ""
    price: str = ""
    badge: str = ""
    emoji: str = "🛒"
    image: str = ""

# ── Endpoints ──────────────────────────────────────────────

@app.get("/api/products")
def list_products():
    db = get_db()
    rows = db.execute("SELECT * FROM products ORDER BY sort_order, id").fetchall()
    db.close()
    return [row_to_dict(r) for r in rows]

@app.post("/api/products", status_code=201)
def create_product(p: ProductIn):
    db = get_db()
    cur = db.execute(
        "INSERT INTO products (name, tags, description, price, badge, emoji, image, sort_order) VALUES (?,?,?,?,?,?,?,?)",
        [p.name, json.dumps(p.tags), p.description, p.price, p.badge, p.emoji, p.image, 9999]
    )
    db.commit()
    row = db.execute("SELECT * FROM products WHERE id = ?", [cur.lastrowid]).fetchone()
    db.close()
    return row_to_dict(row)

@app.put("/api/products/{product_id}")
def update_product(product_id: int, p: ProductIn):
    db = get_db()
    existing = db.execute("SELECT id FROM products WHERE id = ?", [product_id]).fetchone()
    if not existing:
        db.close()
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db.execute(
        "UPDATE products SET name=?, tags=?, description=?, price=?, badge=?, emoji=?, image=? WHERE id=?",
        [p.name, json.dumps(p.tags), p.description, p.price, p.badge, p.emoji, p.image, product_id]
    )
    db.commit()
    row = db.execute("SELECT * FROM products WHERE id = ?", [product_id]).fetchone()
    db.close()
    return row_to_dict(row)

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int):
    db = get_db()
    db.execute("DELETE FROM products WHERE id = ?", [product_id])
    db.commit()
    db.close()
    return {"deleted": product_id}

@app.post("/api/products/reset")
def reset_products():
    db = get_db()
    db.execute("DELETE FROM products")
    for p in DEFAULT_PRODUCTS:
        db.execute(
            "INSERT INTO products (id, name, tags, description, price, badge, emoji, image, sort_order) VALUES (?,?,?,?,?,?,?,?,?)",
            [p["id"], p["name"], json.dumps(p["tags"]), p["description"], p["price"], p["badge"], p["emoji"], p["image"], p["id"]]
        )
    db.execute("UPDATE sqlite_sequence SET seq = ? WHERE name = 'products'", [len(DEFAULT_PRODUCTS)])
    db.commit()
    db.close()
    return {"reset": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
