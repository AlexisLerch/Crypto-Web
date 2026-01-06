import DataTable from '@/components/DataTable'
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

const dummyTrendingCoins = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      data: {
        price: 90000,
        price_change_percentage_24h: {
          usd: 2.1
        }
      }
    }
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      data: {
        price: 3000,
        price_change_percentage_24h: {
          usd: -0.1
  
}}}}]

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Title',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} className='name-image' />
          <p>{item.name}</p>
        </Link>
      )
    }
  },
  {
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
           <p>
              {isTrendingUp ? (
                <TrendingUp width={16} height={16}/>
              ) : (
                <TrendingDown width={16} height={16}/>
              )}
              {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
           </p>
        </div>
      )
    }
  },
  {
    header: 'Price', cellClassName: 'price-cell',
    cell: (coin) => coin.item.data.price
  }
]

const page = () => {
  return <main className='main-container'>
    <section className='home-grid'>
        <div id="coin-overview">
          <div className='header'>
            <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin Logo" width={56} height={56} />
            <div className='info'>
              <p>Bitcoin / BTC</p>
              <h1>90,000.00</h1>
            </div>
          </div>
        </div>
        <p>Tranding Coins</p>
        <div id='trending-coins'>
          <DataTable data={dummyTrendingCoins} columns={columns} rowKey={(coin) => coin.item.id} tableClassName='trending-coins-table'/>
        </div>
    </section>

    <section className='w-full mt-7 space-y-4'>
      <p>Categories</p>
    </section>
  </main>
}

export default page