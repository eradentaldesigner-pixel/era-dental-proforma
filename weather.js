const cache=new Map(),pending=new Map();
module.exports=async function weather(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Yalnızca POST desteklenir.'})}
 const lat=req.body?.latitude,lon=req.body?.longitude;
 if(typeof lat!=='number'||typeof lon!=='number'||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)return res.status(400).json({error:'Geçersiz konum.'});
 const latitude=lat.toFixed(2),longitude=lon.toFixed(2),key=latitude+','+longitude;
 async function load(){const old=cache.get(key);if(old&&old.expires>Date.now())return old.result;
 const response=await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat='+latitude+'&lon='+longitude,{headers:{'User-Agent':'CepFirma/1.0 https://github.com/eradentaldesigner-pixel/era-dental-proforma','Accept':'application/json'},signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw Error('Weather upstream '+response.status);
 const data=await response.json(),series=data.properties?.timeseries;if(!Array.isArray(series)||!series.length)throw Error('Weather data missing');
 const now=Date.now(),point=series.reduce((a,b)=>Math.abs(Date.parse(b.time)-now)<Math.abs(Date.parse(a.time)-now)?b:a),details=point.data?.instant?.details,temp=details?.air_temperature;
 if(!Number.isFinite(temp)||Math.abs(Date.parse(point.time)-now)>10800000)throw Error('Invalid weather forecast');
 const result={temperature:temp,symbol:point.data?.next_1_hours?.summary?.symbol_code||point.data?.next_6_hours?.summary?.symbol_code||'cloudy',forecast_at:point.time,updated_at:data.properties.meta?.updated_at,source:'MET Norway'};
 const expires=Date.parse(response.headers.get('expires')),ttl=Number.isFinite(expires)&&expires>now?expires:now+1800000;
 if(cache.size>=100)cache.delete(cache.keys().next().value);cache.set(key,{result,expires:ttl});return result;}
 try{let task=pending.get(key);if(!task){task=load();pending.set(key,task);task.finally(()=>pending.delete(key)).catch(()=>{})}return res.status(200).json(await task)}catch(e){console.error('Weather service unavailable:',e.message);return res.status(503).json({error:'Hava durumu şu anda alınamıyor.'})}
};
