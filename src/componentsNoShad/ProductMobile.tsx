import { Articulos, Stock } from "api/env";
import { Button } from "@/components/ui/button";


export function ProductMobile(product: Articulos | null | undefined, routeParams: { query: string }, stock: Stock, handleTalleClick: (talle: string) => void, handleCartClick: (producto: Articulos | null | undefined) => void) {
    return (
        <main className="grid justify-center items-center gap-7 m-10">
            <header className="grid gap-3">
                <h1 className="font-bold text-2xl">{product?.nombre}</h1>
                <p className="font-medium text-2xl">${product?.precio}</p>
            </header>
            <aside>
                <img src={product?.img} alt="" className="rounded-lg w-full" />
            </aside>
            <aside>
                <article className='grid gap-3 items-center justify-center w-full'>
                    <p className="text-sm bg-gray-100 p-3 rounded-lg font-medium">{product?.descripcion}</p>
                    <div className="flex gap-4">
                        <p>Talle</p>
                        <p className="font-bold text-purple-700">{stock?.talle}</p>
                        <section className="flex gap-1">
                            <p>{stock?.stock}</p>
                            <p>disponibles</p>
                        </section>
                    </div>
                    <section className="grid gap-3 justify-start">
                        <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
                            {/* hacer componente */}
                            <button onClick={() => handleTalleClick('S')} className={`rounded ${stock.talle === 'S' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>S</button>
                            <button onClick={() => handleTalleClick('M')} className={`rounded ${stock.talle === 'M' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>M</button>
                            <button onClick={() => handleTalleClick('L')} className={`rounded ${stock.talle === 'L' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>L</button>
                            <button onClick={() => handleTalleClick('XL')} className={`rounded ${stock.talle === 'XL' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>XL</button>
                            <button onClick={() => handleTalleClick('XXL')} className={`rounded ${stock.talle === 'XXL' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>XXL</button>
                        </div>
                        <button className="text-left">Guía de talles</button>
                    </section>
                    <div className="grid gap-3">
                        <Button>Comprar</Button>
                        <Button variant={"secondary"} onClick={() => handleCartClick(product)}>Agregar al carrito</Button>
                    </div>
                </article>
            </aside>
        </main>
    )
}